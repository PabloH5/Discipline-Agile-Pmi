import { useState, useEffect } from 'react';
import { fetchProjects } from '../api/endpoints';
import { MOCK_PROJECTS } from '../data/mockData';
import ProjectCard from './ProjectCard';
import NewProjectModal from './NewProjectModal';

export default function ProjectsView() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchProjects()
      .then(data => {
        if (!cancelled) {
          setProjects(Array.isArray(data) ? data : MOCK_PROJECTS);
          setUsingMock(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProjects(MOCK_PROJECTS);
          setUsingMock(true);
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  function handleCreated(newProject) {
    setProjects(prev => [...prev, newProject]);
    setShowModal(false);
  }

  const total       = projects.length;
  const enCurso     = projects.filter(p => p.estado === 'En curso').length;
  const retrasados  = projects.filter(p => p.estado === 'Retrasado').length;
  const completados = projects.filter(p => p.estado === 'Completado').length;
  const avgAvance   = total > 0
    ? Math.round(projects.reduce((s, p) => s + Number(p.avance || 0), 0) / total)
    : 0;

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Proyectos</h1>
          <p className="page-subtitle">
            Seguimiento de avance por proyecto
            {usingMock && ' · Datos de demostración'}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Nuevo proyecto
        </button>
      </div>

      {usingMock && (
        <div className="error-banner">
          ⚠ El webhook de n8n no responde. Mostrando datos de demostración. Configura la URL en <code>src/api/endpoints.js</code>.
        </div>
      )}

      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Total proyectos</span>
          <span className="kpi-value">{total}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">En curso</span>
          <span className="kpi-value" style={{ color: 'var(--en-curso)' }}>{enCurso}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Retrasados</span>
          <span className="kpi-value" style={{ color: 'var(--retrasado)' }}>{retrasados}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Avance promedio</span>
          <span className="kpi-value">{avgAvance}%</span>
          <span className="kpi-sub">{completados} completado{completados !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner" />
          Cargando proyectos…
        </div>
      ) : projects.length === 0 ? (
        <div className="state-box">
          <span className="state-icon">⬡</span>
          <span className="state-title">Sin proyectos registrados</span>
          <span className="state-desc">Crea el primer proyecto usando el botón de arriba.</span>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map(p => (
            <ProjectCard key={p.id || p.nombre} project={p} />
          ))}
        </div>
      )}

      {showModal && (
        <NewProjectModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </>
  );
}

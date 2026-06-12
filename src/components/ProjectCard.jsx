function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
}

function statusClass(estado) {
  return estado?.toLowerCase().replace(' ', '-') || 'en-curso';
}

export default function ProjectCard({ project }) {
  const { nombre, estado, avance, fecha_inicio, fecha_fin_estimada, area_responsable } = project;
  const cls = statusClass(estado);

  return (
    <div className="project-card">
      <div className="project-card-top">
        <div>
          <div className="project-card-name">{nombre}</div>
          <div className="project-card-area">{area_responsable}</div>
        </div>
        <span className={`badge badge-${cls}`}>
          {estado}
        </span>
      </div>

      <div className="progress-wrap">
        <div className="progress-header">
          <span className="progress-pct">{avance}%</span>
          <span className="progress-label">avance</span>
        </div>
        <div className="progress-track">
          <div
            className={`progress-fill ${cls}`}
            style={{ width: `${Math.min(Math.max(avance, 0), 100)}%` }}
          />
        </div>
      </div>

      <div className="project-card-dates">
        <div className="project-date-item">
          <span className="project-date-label">Inicio</span>
          <span className="project-date-value">{formatDate(fecha_inicio)}</span>
        </div>
        <div className="project-date-item">
          <span className="project-date-label">Fin estimado</span>
          <span className="project-date-value">{formatDate(fecha_fin_estimada)}</span>
        </div>
      </div>
    </div>
  );
}

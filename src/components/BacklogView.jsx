import { useState, useEffect } from 'react';
import { fetchBacklog } from '../api/endpoints';
import { MOCK_BACKLOG, PRIORIDADES, AREAS, TIPOS_SOLICITUD } from '../data/mockData';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: '2-digit' });
}

function badgeClass(priority) {
  const map = { Critica: 'critica', Alta: 'alta', Media: 'media', Baja: 'baja' };
  return map[priority] || 'baja';
}

export default function BacklogView({ onCountChange }) {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  const [filterPrio, setFilterPrio] = useState('Todas');
  const [filterArea, setFilterArea] = useState('Todas');
  const [filterTipo, setFilterTipo] = useState('Todos');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchBacklog()
      .then(data => {
        if (!cancelled) {
          const list = Array.isArray(data) ? data : MOCK_BACKLOG;
          setItems(list);
          onCountChange?.(list.length);
          setUsingMock(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setItems(MOCK_BACKLOG);
          onCountChange?.(MOCK_BACKLOG.length);
          setUsingMock(true);
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  const filtered = items.filter(i => {
    if (filterPrio !== 'Todas' && i.prioridad_real !== filterPrio) return false;
    if (filterArea !== 'Todas' && i.area_responsable !== filterArea) return false;
    if (filterTipo !== 'Todos' && i.tipo_solicitud !== filterTipo) return false;
    return true;
  });

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Backlog de Solicitudes</h1>
          <p className="page-subtitle">
            Solicitudes clasificadas por IA desde n8n
            {usingMock && ' · Datos de demostración'}
          </p>
        </div>
      </div>

      {usingMock && (
        <div className="error-banner">
          ⚠ El webhook de n8n no responde. Mostrando datos de demostración.
        </div>
      )}

      <div className="filter-row">
        <select
          className="filter-select"
          value={filterPrio}
          onChange={e => setFilterPrio(e.target.value)}
        >
          <option value="Todas">Prioridad: Todas</option>
          {PRIORIDADES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <select
          className="filter-select"
          value={filterArea}
          onChange={e => setFilterArea(e.target.value)}
        >
          <option value="Todas">Área: Todas</option>
          {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>

        <select
          className="filter-select"
          value={filterTipo}
          onChange={e => setFilterTipo(e.target.value)}
        >
          <option value="Todos">Tipo: Todos</option>
          {TIPOS_SOLICITUD.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <span className="filter-count">{filtered.length} solicitud{filtered.length !== 1 ? 'es' : ''}</span>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner" />
          Cargando backlog…
        </div>
      ) : filtered.length === 0 ? (
        <div className="state-box">
          <span className="state-icon">◧</span>
          <span className="state-title">Sin resultados</span>
          <span className="state-desc">No hay solicitudes que coincidan con los filtros seleccionados.</span>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Resumen</th>
                <th>Tipo</th>
                <th>Prioridad</th>
                <th>Área</th>
                <th>Justificación</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={i}>
                  <td className="td-date">{formatDate(item.fecha_solicitud)}</td>
                  <td className="td-main">{item.resumen_linea}</td>
                  <td>
                    <span style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      background: 'var(--surface-2)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.tipo_solicitud}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${badgeClass(item.prioridad_real)}`}>
                      {item.prioridad_real}
                    </span>
                  </td>
                  <td style={{ fontSize: '13px', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>
                    {item.area_responsable}
                  </td>
                  <td className="td-justify">{item.justificacion_prioridad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

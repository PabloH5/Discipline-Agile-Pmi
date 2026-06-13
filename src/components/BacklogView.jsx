import { useState, useEffect } from 'react';
import { fetchBacklog, updateBacklogStatus } from '../api/endpoints';
import { MOCK_BACKLOG, PRIORIDADES, AREAS, TIPOS_SOLICITUD, ESTADOS_SOLICITUD } from '../data/mockData';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: '2-digit' });
}

function badgeClass(priority) {
  const map = { Critica: 'critica', Alta: 'alta', Media: 'media', Baja: 'baja' };
  return map[priority] || 'baja';
}

function statusClass(estado) {
  const map = { 'Nuevo': 'nuevo', 'En curso': 'en-curso', 'Solucionado': 'solucionado' };
  return map[estado] || 'nuevo';
}

export default function BacklogView({ onCountChange }) {
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [savingRow, setSavingRow] = useState(null);
  const [saveError, setSaveError] = useState(null);

  const [filterPrio,   setFilterPrio]   = useState('Todas');
  const [filterArea,   setFilterArea]   = useState('Todas');
  const [filterTipo,   setFilterTipo]   = useState('Todos');
  const [filterEstado, setFilterEstado] = useState('Todos');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchBacklog()
      .then(data => {
        if (!cancelled) {
          const list = Array.isArray(data) ? data : MOCK_BACKLOG;
          // Asegura que todos los items tengan estado_solicitud
          const normalized = list.map(i => ({
            ...i,
            estado_solicitud: i.estado_solicitud || 'Nuevo',
          }));
          setItems(normalized);
          onCountChange?.(normalized.length);
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

  async function handleStatusChange(rowNumber, newStatus, index) {
    const previous = items[index].estado_solicitud;

    // Actualización optimista
    setItems(prev => prev.map((item, i) =>
      i === index ? { ...item, estado_solicitud: newStatus } : item
    ));
    setSaveError(null);
    setSavingRow(rowNumber);

    try {
      await updateBacklogStatus(rowNumber, newStatus);
    } catch (err) {
      // Revertir si falla
      setItems(prev => prev.map((item, i) =>
        i === index ? { ...item, estado_solicitud: previous } : item
      ));
      setSaveError(`Error al guardar estado (fila ${rowNumber})`);
    } finally {
      setSavingRow(null);
    }
  }

  const filtered = items.filter(i => {
    if (filterPrio   !== 'Todas' && i.prioridad_real    !== filterPrio)   return false;
    if (filterArea   !== 'Todas' && i.area_responsable  !== filterArea)   return false;
    if (filterTipo   !== 'Todos' && i.tipo_solicitud    !== filterTipo)   return false;
    if (filterEstado !== 'Todos' && i.estado_solicitud  !== filterEstado) return false;
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
        <a
          className="btn btn-primary"
          href="https://n8n.kaicol.com/form/6611df75-6731-4482-add3-b99c0f8d09d6"
          target="_blank"
          rel="noopener noreferrer"
        >
          + Nueva solicitud
        </a>
      </div>

      {usingMock && (
        <div className="error-banner">
          ⚠ El webhook de n8n no responde. Mostrando datos de demostración.
        </div>
      )}

      {saveError && (
        <div className="error-banner">⚠ {saveError}</div>
      )}

      <div className="filter-row">
        <select className="filter-select" value={filterEstado} onChange={e => setFilterEstado(e.target.value)}>
          <option value="Todos">Estado: Todos</option>
          {ESTADOS_SOLICITUD.map(e => <option key={e} value={e}>{e}</option>)}
        </select>

        <select className="filter-select" value={filterPrio} onChange={e => setFilterPrio(e.target.value)}>
          <option value="Todas">Prioridad: Todas</option>
          {PRIORIDADES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <select className="filter-select" value={filterArea} onChange={e => setFilterArea(e.target.value)}>
          <option value="Todas">Área: Todas</option>
          {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>

        <select className="filter-select" value={filterTipo} onChange={e => setFilterTipo(e.target.value)}>
          <option value="Todos">Tipo: Todos</option>
          {TIPOS_SOLICITUD.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <span className="filter-count">
          {filtered.length} solicitud{filtered.length !== 1 ? 'es' : ''}
        </span>
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
          <span className="state-desc">No hay solicitudes que coincidan con los filtros.</span>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Resumen</th>
                <th>Tipo</th>
                <th>Prioridad</th>
                <th>Área</th>
                <th>Justificación</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => {
                const globalIndex = items.indexOf(item);
                const isSaving = savingRow === item.row_number;
                return (
                  <tr key={item.row_number || i}>
                    <td>
                      <select
                        className={`status-select status-${statusClass(item.estado_solicitud)}`}
                        value={item.estado_solicitud || 'Nuevo'}
                        onChange={e => handleStatusChange(item.row_number, e.target.value, globalIndex)}
                        disabled={isSaving}
                        title={isSaving ? 'Guardando…' : 'Cambiar estado'}
                      >
                        {ESTADOS_SOLICITUD.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
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
                        whiteSpace: 'nowrap',
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
import { useState } from 'react';
import { createProject } from '../api/endpoints';
import { AREAS, ESTADOS } from '../data/mockData';

const EMPTY_FORM = {
  nombre: '',
  estado: 'En curso',
  avance: 0,
  fecha_inicio: '',
  fecha_fin_estimada: '',
  area_responsable: 'Operaciones',
};

export default function NewProjectModal({ onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.nombre.trim()) {
      setError('El nombre del proyecto es obligatorio.');
      return;
    }
    if (!form.fecha_inicio || !form.fecha_fin_estimada) {
      setError('Las fechas de inicio y fin son obligatorias.');
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      ...form,
      id: `proj-${Date.now()}`,
      avance: Number(form.avance),
    };

    try {
      await createProject(payload);
      onCreated(payload);
    } catch (err) {
      // Si el webhook aún no existe, usamos datos locales de todos modos
      console.warn('Webhook no disponible, usando datos locales:', err.message);
      onCreated(payload);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <span className="modal-title">Nuevo Proyecto</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {error && <div className="error-banner">⚠ {error}</div>}

        <div className="modal-form">
          <div className="form-field">
            <label className="form-label">Nombre del proyecto *</label>
            <input
              className="form-input"
              type="text"
              placeholder="Ej. Residencial El Bosque"
              value={form.nombre}
              onChange={e => set('nombre', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Estado</label>
              <select className="form-select" value={form.estado} onChange={e => set('estado', e.target.value)}>
                {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Área responsable</label>
              <select className="form-select" value={form.area_responsable} onChange={e => set('area_responsable', e.target.value)}>
                {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Avance actual: <strong>{form.avance}%</strong></label>
            <div className="form-range-wrap">
              <input
                className="form-range"
                type="range"
                min="0"
                max="100"
                step="1"
                value={form.avance}
                onChange={e => set('avance', Number(e.target.value))}
              />
              <span className="form-range-val">{form.avance}%</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Fecha de inicio *</label>
              <input
                className="form-input"
                type="date"
                value={form.fecha_inicio}
                onChange={e => set('fecha_inicio', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Fin estimado *</label>
              <input
                className="form-input"
                type="date"
                value={form.fecha_fin_estimada}
                onChange={e => set('fecha_fin_estimada', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Guardando…' : 'Crear proyecto'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ⚠️  REEMPLAZAR con la URL base de tu instancia n8n
//     Ejemplo: https://mi-workspace.app.n8n.cloud
// ============================================================
const N8N_BASE = 'https://TU-N8N-URL';

export const ENDPOINTS = {
  getProjects:    `${N8N_BASE}/webhook/projects-get`,
  createProject:  `${N8N_BASE}/webhook/projects-create`,
  getBacklog:     `${N8N_BASE}/webhook/backlog-get`,
};

// Nota: los webhooks en n8n deben tener CORS habilitado
// para el dominio de GitHub Pages: https://TU-USUARIO.github.io

export async function fetchProjects() {
  const res = await fetch(ENDPOINTS.getProjects);
  if (!res.ok) throw new Error(`HTTP ${res.status} al obtener proyectos`);
  return res.json();
}

export async function createProject(data) {
  const res = await fetch(ENDPOINTS.createProject, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} al crear proyecto`);
  return res.json();
}

export async function fetchBacklog() {
  const res = await fetch(ENDPOINTS.getBacklog);
  if (!res.ok) throw new Error(`HTTP ${res.status} al obtener backlog`);
  return res.json();
}

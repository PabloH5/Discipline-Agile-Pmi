// ============================================================
// ⚠️  REEMPLAZAR con la URL base de tu instancia n8n
//     Ejemplo: https://mi-workspace.app.n8n.cloud
// ============================================================
const N8N_BASE = "https://TU-N8N-URL";

export const ENDPOINTS = {
  getProjects: `https://n8n.kaicol.com/webhook/projects-get`,
  createProject: `https://n8n.kaicol.com/webhook/projects-create`,
  getBacklog: `https://n8n.kaicol.com/webhook/backlog-get`,
  updateBacklogStatus: `https://n8n.kaicol.com/webhook/backlog-update-status`,
};


export async function fetchProjects() {
  const res = await fetch(ENDPOINTS.getProjects);
  if (!res.ok) throw new Error(`HTTP ${res.status} al obtener proyectos`);
  return res.json();
}

export async function createProject(data) {
  const res = await fetch(ENDPOINTS.createProject, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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


export async function updateBacklogStatus(rowNumber, estadoSolicitud) {
  const res = await fetch(ENDPOINTS.updateBacklogStatus, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ row_number: rowNumber, estado_solicitud: estadoSolicitud }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

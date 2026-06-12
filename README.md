# PMO Dashboard – Constructora del Pacífico

Dashboard de seguimiento de proyectos y backlog de solicitudes para la PMO.

## Setup local

```bash
npm install
npm run dev
```

## Antes de desplegar — dos pasos obligatorios

### 1. Configurar la URL de n8n

Edita `src/api/endpoints.js` y reemplaza:

```js
const N8N_BASE = 'https://TU-N8N-URL'; // ← aquí va tu URL real
```

### 2. Configurar el nombre del repositorio

Edita `vite.config.js` y pon el nombre exacto de tu repo en GitHub:

```js
base: '/nombre-de-tu-repo/',
```

## Desplegar en GitHub Pages

```bash
npm run deploy
```

O simplemente haz push a `main` y el workflow de GitHub Actions se encarga solo.

## Configurar webhooks en n8n

Necesitas tres webhooks activos:

| Webhook | Método | Descripción |
|---------|--------|-------------|
| `/webhook/projects-get` | GET | Lee la hoja "Proyectos" y devuelve array JSON |
| `/webhook/projects-create` | POST | Recibe JSON de proyecto y lo agrega a la hoja |
| `/webhook/backlog-get` | GET | Lee "Hoja 1" (backlog) y devuelve array JSON |

**CORS**: En cada webhook de n8n, habilita CORS para `https://TU-USUARIO.github.io`.

## Estructura del Sheet "Proyectos" (nueva hoja)

Columnas requeridas:
- `id` — identificador único
- `nombre` — nombre del proyecto
- `estado` — En curso / Retrasado / Completado
- `avance` — número del 0 al 100
- `fecha_inicio` — YYYY-MM-DD
- `fecha_fin_estimada` — YYYY-MM-DD
- `area_responsable` — una de las 8 áreas

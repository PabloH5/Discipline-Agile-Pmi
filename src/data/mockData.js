export const MOCK_PROJECTS = [
  {
    id: 'proj-001',
    nombre: 'Torre Marina',
    estado: 'En curso',
    avance: 67,
    fecha_inicio: '2024-03-01',
    fecha_fin_estimada: '2025-09-30',
    area_responsable: 'Operaciones',
  },
  {
    id: 'proj-002',
    nombre: 'Las Palmas',
    estado: 'Retrasado',
    avance: 42,
    fecha_inicio: '2024-01-15',
    fecha_fin_estimada: '2025-06-30',
    area_responsable: 'Operaciones',
  },
];

export const MOCK_BACKLOG = [
  {
    row_number: 2,
    fecha_solicitud: '2025-05-12T09:15:00Z',
    resumen_linea: 'Falta de cemento paraliza estructura Torre Marina',
    tipo_solicitud: 'Gestión de Compras',
    prioridad_real: 'Critica',
    area_responsable: 'Compras',
    justificacion_prioridad: 'Detiene avance de obra directamente.',
    estado_solicitud: 'Nuevo',
  },
  {
    row_number: 3,
    fecha_solicitud: '2025-05-14T11:40:00Z',
    resumen_linea: 'Huelga de trabajadores sector Las Palmas bloquea obra',
    tipo_solicitud: 'Cambio de Cronograma',
    prioridad_real: 'Critica',
    area_responsable: 'Operaciones',
    justificacion_prioridad: 'Paralización total hasta negociación sindical.',
    estado_solicitud: 'En curso',
  },
  {
    row_number: 4,
    fecha_solicitud: '2025-05-16T08:00:00Z',
    resumen_linea: 'Retraso en cronograma Las Palmas por temporada lluvias',
    tipo_solicitud: 'Cambio de Cronograma',
    prioridad_real: 'Alta',
    area_responsable: 'Operaciones',
    justificacion_prioridad: 'Afecta fecha de entrega de proyecto clave.',
    estado_solicitud: 'Nuevo',
  },
  {
    row_number: 5,
    fecha_solicitud: '2025-05-17T14:20:00Z',
    resumen_linea: 'Cambio en especificaciones eléctricas Torre Marina piso 8',
    tipo_solicitud: 'Cambio de Alcance',
    prioridad_real: 'Alta',
    area_responsable: 'Diseño',
    justificacion_prioridad: 'Impacta cronograma y presupuesto aprobado.',
    estado_solicitud: 'En curso',
  },
  {
    row_number: 6,
    fecha_solicitud: '2025-05-19T10:05:00Z',
    resumen_linea: 'Solicitud de reporte de costos Q1 2025 Financiera',
    tipo_solicitud: 'Reporte Financiero',
    prioridad_real: 'Media',
    area_responsable: 'Financiera',
    justificacion_prioridad: 'Requerimiento de dirección, no bloquea operación.',
    estado_solicitud: 'Solucionado',
  },
  {
    row_number: 7,
    fecha_solicitud: '2025-05-20T16:45:00Z',
    resumen_linea: 'Revisión contrato proveedor acero reforzado Q2',
    tipo_solicitud: 'Requerimiento de Información',
    prioridad_real: 'Media',
    area_responsable: 'Legal',
    justificacion_prioridad: 'Contrato vigente hasta julio, no es urgente.',
    estado_solicitud: 'Nuevo',
  },
  {
    row_number: 8,
    fecha_solicitud: '2025-05-21T09:30:00Z',
    resumen_linea: 'Actualizar plantilla de informes semanales PMO',
    tipo_solicitud: 'Requerimiento de Información',
    prioridad_real: 'Baja',
    area_responsable: 'PMO Interna',
    justificacion_prioridad: 'Mejora administrativa interna, sin impacto operativo.',
    estado_solicitud: 'Nuevo',
  },
  {
    row_number: 9,
    fecha_solicitud: '2025-05-22T13:00:00Z',
    resumen_linea: 'Reunión presentación cliente potencial proyecto Cali Norte',
    tipo_solicitud: 'Requerimiento de Información',
    prioridad_real: 'Baja',
    area_responsable: 'Comercial',
    justificacion_prioridad: 'Oportunidad futura, no afecta proyectos actuales.',
    estado_solicitud: 'Solucionado',
  },
];

export const AREAS = [
  'Operaciones', 'Comercial', 'Diseño', 'Compras',
  'Calidad', 'Legal', 'Financiera', 'PMO Interna',
];

export const ESTADOS = ['En curso', 'Retrasado', 'Completado'];
export const ESTADOS_SOLICITUD = ['Nuevo', 'En curso', 'Solucionado'];

export const TIPOS_SOLICITUD = [
  'Cambio de Cronograma',
  'Cambio de Alcance',
  'Requerimiento de Información',
  'Reporte Financiero',
  'Gestión de Compras',
];

export const PRIORIDADES = ['Critica', 'Alta', 'Media', 'Baja'];
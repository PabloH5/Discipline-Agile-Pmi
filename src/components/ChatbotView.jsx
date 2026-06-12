export default function ChatbotView() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Asistente PMO</h1>
          <p className="page-subtitle">Chat inteligente sobre proyectos y solicitudes</p>
        </div>
      </div>

      <div className="chatbot-shell">
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">◈</div>
            <div>
              <div className="chatbot-title">Asistente PMO</div>
              <div className="chatbot-status">Próximamente disponible</div>
            </div>
          </div>

          <div className="chatbot-body">
            <span className="chatbot-coming-soon">En desarrollo — Taller 3</span>
            <div className="chatbot-placeholder-title">El chatbot viene en el siguiente taller</div>
            <div className="chatbot-placeholder-desc">
              Podrás consultar el estado de los proyectos, prioridades del backlog
              y resúmenes de solicitudes en lenguaje natural.
            </div>
          </div>

          <div className="chatbot-input-row">
            <input
              className="chatbot-input"
              type="text"
              placeholder="Escribe una pregunta sobre un proyecto…"
              disabled
            />
            <button className="btn btn-primary" disabled style={{ opacity: 0.45 }}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

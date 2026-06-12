export default function Sidebar({ activeView, onNavigate, backlogCount }) {
  const items = [
    { id: 'projects', icon: '⬡', label: 'Proyectos' },
    { id: 'backlog',  icon: '◧', label: 'Backlog', badge: backlogCount },
    { id: 'chatbot', icon: '◈', label: 'Asistente PMO', soon: true },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">CP</div>
        <div className="sidebar-company">Constructora<br />del Pacífico</div>
        <div className="sidebar-subtitle">PMO · Panel de Control</div>
      </div>

      <nav className="sidebar-nav">
        {items.map(item => (
          <button
            key={item.id}
            className={`sidebar-nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.badge > 0 && (
              <span className="sidebar-nav-badge">{item.badge}</span>
            )}
            {item.soon && (
              <span className="sidebar-nav-badge" style={{ background: '#6B7280' }}>Pronto</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        v0.1 · Taller 2
      </div>
    </aside>
  );
}

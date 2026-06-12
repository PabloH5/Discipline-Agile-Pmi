import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProjectsView from './components/ProjectsView';
import BacklogView from './components/BacklogView';
import ChatbotView from './components/ChatbotView';

export default function App() {
  const [activeView, setActiveView]     = useState('projects');
  const [backlogCount, setBacklogCount] = useState(0);

  return (
    <div className="app-layout">
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        backlogCount={backlogCount}
      />

      <main className="main-content">
        {activeView === 'projects' && <ProjectsView />}
        {activeView === 'backlog'  && <BacklogView onCountChange={setBacklogCount} />}
        {activeView === 'chatbot'  && <ChatbotView />}
      </main>
    </div>
  );
}

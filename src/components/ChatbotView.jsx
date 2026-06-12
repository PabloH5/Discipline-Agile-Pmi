import { useEffect, useRef } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

export default function ChatbotView() {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    // Clear the container first to prevent duplicate renders during HMR or re-renders
    chatContainerRef.current.innerHTML = '';

    createChat({
      webhookUrl: 'https://n8n.kaicol.com/webhook/642e6d48-189e-47dc-b5e8-4608d6717257/chat',
      target: '#n8n-chat-container',
      mode: 'fullscreen',
      showTimestamps: true,
      initialMessages: [
        '¡Hola! Soy el Asistente PMO de la Constructora del Pacífico.',
        '¿En qué puedo ayudarte hoy? Puedes preguntarme sobre el estado de los proyectos, prioridades del backlog o resúmenes de solicitudes.'
      ]
    });

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Asistente PMO</h1>
          <p className="page-subtitle">Chat inteligente sobre proyectos y solicitudes</p>
        </div>
      </div>

      <div className="chatbot-shell" style={{ height: 'calc(100vh - 200px)', minHeight: '500px', width: '100%' }}>
        <div
          id="n8n-chat-container"
          ref={chatContainerRef}
          style={{ width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}
        />
      </div>
    </>
  );
}


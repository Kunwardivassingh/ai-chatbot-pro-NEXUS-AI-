import { useEffect, useRef } from 'react';
// Corrected import paths
import MessageBubble from '../MessageBubble/MessageBubble';
import InputBar from '../InputBar/InputBar';
import styles from './ChatWindow.module.css';
import type { Conversation } from '../../pages/ChatPage';

interface ChatWindowProps {
  conversation: Conversation | undefined;
  onSendMessage: (message: string) => void;
    cancelSpeech: () => void; // Add this prop
    isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const ChatWindow = ({ conversation, onSendMessage , cancelSpeech, isSidebarOpen, onToggleSidebar}: ChatWindowProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  return (
    <div className={styles.chatWindow}>

           {/* --- ADD THIS BUTTON --- */}
      {!isSidebarOpen && (
        <button className={styles.openSidebarButton} onClick={onToggleSidebar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
        </button>
      )}

      {conversation ? (
        <>
          <div className={styles.messageList}>
            {conversation.messages.map((msg) => (
              <MessageBubble key={msg.id} text={msg.text} sender={msg.sender as 'user' | 'assistant'} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <InputBar onSendMessage={onSendMessage} cancelSpeech={cancelSpeech} />
        </>
      ) : (
        <div className={styles.noConversation}>
          <h1>Nexus AI</h1>
          <p>Select a conversation or start a new one.</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;





///////////////////////////////////
///////////////////////////
////////////////////
//new




// import { useEffect, useRef } from 'react';
// import MessageBubble from '../MessageBubble/MessageBubble';
// import InputBar from '../InputBar/InputBar';
// import styles from './ChatWindow.module.css';
// import type { Conversation } from '../../pages/ChatPage';

// interface ChatWindowProps {
//   conversation: Conversation | undefined;
//   onSendMessage: (message: string) => void;
//   cancelSpeech: () => void;
//   isSidebarOpen: boolean;
//   onToggleSidebar: () => void;
//   onVoiceStart: () => void; // Add this prop
// }

// const ChatWindow = ({ conversation, onSendMessage, cancelSpeech, isSidebarOpen, onToggleSidebar, onVoiceStart }: ChatWindowProps) => { // Add to destructuring
//   const messagesEndRef = useRef<null | HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [conversation?.messages]);

//   return (
//     <div className={styles.chatWindow}>
//       {!isSidebarOpen && (
//         <button className={styles.openSidebarButton} onClick={onToggleSidebar}>
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
//         </button>
//       )}

//       {conversation ? (
//         <>
//           <div className={styles.messageList}>
//             {conversation.messages.map((msg) => (
//               <MessageBubble key={msg.id} text={msg.text} sender={msg.sender as 'user' | 'assistant'} />
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//           {/* Pass the new function down */}
//           <InputBar onSendMessage={onSendMessage} cancelSpeech={cancelSpeech} onVoiceStart={onVoiceStart} />
//         </>
//       ) : (
//         <div className={styles.noConversation}>
//           <h1>Nexus AI</h1>
//           <p>Select a conversation or start a new one.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;
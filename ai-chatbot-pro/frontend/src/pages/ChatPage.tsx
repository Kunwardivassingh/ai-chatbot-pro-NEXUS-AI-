// import { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar/Sidebar';
// import ChatWindow from '../components/ChatWindow/ChatWindow';
// import { getConversations, createNewConversation, postMessage, deleteConversation } from '../services/chatService';
// import { useTextToSpeech } from '../hooks/useTextToSpeech';

// export interface Message { id: number; text: string; sender: 'user' | 'assistant'; }
// export interface Conversation { id: number; title: string; messages: Message[]; }

// const ChatPage = () => {
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const { speak, cancel } = useTextToSpeech();

//   useEffect(() => {
//     const loadConversations = async () => {
//       setIsLoading(true);
//       try {
//         const response = await getConversations();
//         const loadedConversations = response.data;
//         setConversations(loadedConversations);
//         if (loadedConversations.length > 0) {
//           setActiveConversationId(loadedConversations[0].id);
//         } else {
//           setActiveConversationId(null);
//         }
//       } catch (error) {
//         console.error("Failed to load conversations:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadConversations();
//   }, []);

//   const handleNewChat = async () => {
//     try {
//       const response = await createNewConversation();
//       const newConversation = response.data;
//       setConversations(prev => [newConversation, ...prev]);
//       setActiveConversationId(newConversation.id);
//     } catch (error) {
//       console.error("Failed to create new chat:", error);
//     }
//   };

//   const handleDeleteConversation = async (id: number) => {
//     try {
//       await deleteConversation(id);
//       const updatedConversations = conversations.filter(c => c.id !== id);
//       setConversations(updatedConversations);
//       if (activeConversationId === id) {
//         setActiveConversationId(updatedConversations.length > 0 ? updatedConversations[0].id : null);
//       }
//     } catch (error) {
//       console.error("Failed to delete conversation:", error);
//     }
//   };

//   const handleSelectConversation = (id: number) => {
//     cancel();
//     setActiveConversationId(id);
//   };

//   // --- THIS IS THE FINAL, CORRECTED SEND MESSAGE FUNCTION ---
//   const handleSendMessage = async (userInput: string) => {
//     if (!activeConversationId) return;
//     cancel();
//     const userMessage: Message = { id: Date.now(), text: userInput, sender: 'user' };

//     // Optimistically update the UI with the user's message
//     const conversationsWithUserMessage = conversations.map(c => {
//       if (c.id === activeConversationId) {
//         const newTitle = c.title === "New Chat" ? userInput.substring(0, 40) : c.title;
//         return { ...c, title: newTitle, messages: [...c.messages, userMessage] };
//       }
//       return c;
//     });
//     setConversations(conversationsWithUserMessage);

//     try {
//       const response = await postMessage(activeConversationId, userInput);
//       const responseData = response.data;
      
//       let aiMessage: Message;

//       // Check the response type from the backend
//       if (responseData.type === 'url') {
//         window.open(responseData.url, '_blank');
//         aiMessage = responseData.message;
//       } else {
//         aiMessage = responseData.message;
//       }
      
//       const isVoiceEnabled = localStorage.getItem('voice_output_enabled') === 'true';
//       if (isVoiceEnabled) {
//         speak(aiMessage.text);
//       }
      
//       // // Update the conversation with the AI's message
//       // const conversationsWithAiMessage = conversations.map(c => {
//       //   if (c.id === activeConversationId) {
//       //      // Find the existing conversation and add the new message to it
//       //      const updatedMessages = [...c.messages, userMessage, aiMessage];
//       //      return { ...c, messages: updatedMessages };
//       //   }
//       //   return c;
//       // });
//       // // This part was buggy before. We need to refetch to get the correct order.
//       // // A more advanced solution uses websockets, but refetching is the simplest fix.
//       // const freshConversations = await getConversations();
//       // setConversations(freshConversations.data);

//       // A simple refetch is the easiest and most reliable way to update the UI
// const freshConversations = await getConversations();
// setConversations(freshConversations.data);

//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(prev => !prev);
//   };

//   const activeConversation = conversations.find(c => c.id === activeConversationId);

//   if (isLoading) {
//     return <div style={{ color: 'white', textAlign: 'center', paddingTop: '20%' }}>Loading conversations...</div>;
//   }

//   return (
//     <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
//       <Sidebar
//         isOpen={isSidebarOpen}
//         conversations={conversations}
//         activeConversationId={activeConversationId}
//         onNewChat={handleNewChat}
//         onSelectConversation={handleSelectConversation}
//         onDeleteConversation={handleDeleteConversation}
//         onToggleSidebar={toggleSidebar}
//       />
//       <ChatWindow
//         conversation={activeConversation}
//         onSendMessage={handleSendMessage}
//         cancelSpeech={cancel}
//         isSidebarOpen={isSidebarOpen}
//         onToggleSidebar={toggleSidebar}
//       />
//     </div>
//   );
// };

// export default ChatPage;


////////////////////////////
//////////////////////////
/////////////////////
//new

// import { useState, useEffect, useRef } from 'react'; // Make sure to import useRef
// import Sidebar from '../components/Sidebar/Sidebar';
// import ChatWindow from '../components/ChatWindow/ChatWindow';
// import { getConversations, createNewConversation, postMessage, deleteConversation } from '../services/chatService';
// import { useTextToSpeech } from '../hooks/useTextToSpeech';

// export interface Message { id: number; text: string; sender: 'user' | 'assistant'; }
// export interface Conversation { id: number; title: string; messages: Message[]; }

// const ChatPage = () => {
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const { speak, cancel } = useTextToSpeech();
  
//   // --- THIS IS THE FIX (Part 1) ---
//   // This ref will hold a reference to the new tab window
//   const websiteTabRef = useRef<Window | null>(null);
//   // --- END OF FIX ---

//   useEffect(() => {
//     const loadConversations = async () => {
//       setIsLoading(true);
//       try {
//         const response = await getConversations();
//         const loadedConversations = response.data;
//         setConversations(loadedConversations);
//         if (loadedConversations.length > 0) {
//           setActiveConversationId(loadedConversations[0].id);
//         } else {
//           setActiveConversationId(null);
//         }
//       } catch (error) {
//         console.error("Failed to load conversations:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadConversations();
//   }, []);

//   const handleNewChat = async () => {
//     try {
//       const response = await createNewConversation();
//       const newConversation = response.data;
//       setConversations(prev => [newConversation, ...prev]);
//       setActiveConversationId(newConversation.id);
//     } catch (error) {
//       console.error("Failed to create new chat:", error);
//     }
//   };

//   const handleDeleteConversation = async (id: number) => {
//     try {
//       await deleteConversation(id);
//       const updatedConversations = conversations.filter(c => c.id !== id);
//       setConversations(updatedConversations);
//       if (activeConversationId === id) {
//         setActiveConversationId(updatedConversations.length > 0 ? updatedConversations[0].id : null);
//       }
//     } catch (error) {
//       console.error("Failed to delete conversation:", error);
//     }
//   };

//   const handleSelectConversation = (id: number) => {
//     cancel();
//     setActiveConversationId(id);
//   };
  
//   // --- THIS IS THE FIX (Part 2) ---
//   const handleVoiceStart = () => {
//     // When voice recording starts, open a blank tab and store its reference
//     const newTab = window.open('about:blank', '_blank');
//     if (newTab) {
//         newTab.document.write('Loading website...'); // Optional: Show a loading message
//         websiteTabRef.current = newTab;
//     }
//   };
//   // --- END OF FIX ---

//   const handleSendMessage = async (userInput: string) => {
//     if (!activeConversationId) return;
//     cancel();
//     const userMessage: Message = { id: Date.now(), text: userInput, sender: 'user' };

//     const conversationsWithUserMessage = conversations.map(c => {
//       if (c.id === activeConversationId) {
//         const newTitle = c.title === "New Chat" ? userInput.substring(0, 40) : c.title;
//         return { ...c, title: newTitle, messages: [...c.messages, userMessage] };
//       }
//       return c;
//     });
//     setConversations(conversationsWithUserMessage);

//     try {
//       const response = await postMessage(activeConversationId, userInput);
//       const responseData = response.data;
      
//       let aiMessage: Message;

//       // --- THIS IS THE FIX (Part 3) ---
//       if (responseData.type === 'url' && websiteTabRef.current) {
//         // If it's a URL and we have a tab reference, redirect it
//         websiteTabRef.current.location.href = responseData.url;
//         websiteTabRef.current = null; // Clear the reference
//         aiMessage = responseData.message;
//       } else if (responseData.type === 'url') {
//         // Fallback for text input or if the tab failed to open
//         window.open(responseData.url, '_blank');
//         aiMessage = responseData.message;
//       } else {
//         // If the intent was not a URL, close the blank tab
//         if (websiteTabRef.current) {
//           websiteTabRef.current.close();
//           websiteTabRef.current = null;
//         }
//         aiMessage = responseData.message;
//       }
//       // --- END OF FIX ---
      
//       const isVoiceEnabled = localStorage.getItem('voice_output_enabled') === 'true';
//       if (isVoiceEnabled) {
//         speak(aiMessage.text);
//       }
      
//       const freshConversations = await getConversations();
//       setConversations(freshConversations.data);

//     } catch (error) {
//       console.error("Failed to send message:", error);
//       // Ensure any blank tabs are closed on error
//        if (websiteTabRef.current) {
//           websiteTabRef.current.close();
//           websiteTabRef.current = null;
//         }
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(prev => !prev);
//   };

//   const activeConversation = conversations.find(c => c.id === activeConversationId);

//   if (isLoading) {
//     return <div style={{ color: 'white', textAlign: 'center', paddingTop: '20%' }}>Loading conversations...</div>;
//   }

//   return (
//     <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
//       <Sidebar
//         isOpen={isSidebarOpen}
//         conversations={conversations}
//         activeConversationId={activeConversationId}
//         onNewChat={handleNewChat}
//         onSelectConversation={handleSelectConversation}
//         onDeleteConversation={handleDeleteConversation}
//         onToggleSidebar={toggleSidebar}
//       />
//       <ChatWindow
//         conversation={activeConversation}
//         onSendMessage={handleSendMessage}
//         cancelSpeech={cancel}
//         isSidebarOpen={isSidebarOpen}
//         onToggleSidebar={toggleSidebar}
//         // --- THIS IS THE FIX (Part 4) ---
//         onVoiceStart={handleVoiceStart} 
//         // --- END OF FIX ---
//       />
//     </div>
//   );
// };

// export default ChatPage;



/////////////////////////////////////////
///////newwwwwwwwwwww parttttt 22

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import { getConversations, createNewConversation, postMessage, deleteConversation } from '../services/chatService';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

// --- Helper hook to check screen size ---
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

export interface Message { id: number; text: string; sender: 'user' | 'assistant'; }
export interface Conversation { id: number; title: string; messages: Message[]; }

const ChatPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { speak, cancel } = useTextToSpeech();

  // --- Responsive State Logic ---
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);
  // --- End of Responsive Logic ---

  useEffect(() => {
    const loadConversations = async () => {
      setIsLoading(true);
      try {
        const response = await getConversations();
        const loadedConversations = response.data;
        setConversations(loadedConversations);
        if (loadedConversations.length > 0) {
          setActiveConversationId(loadedConversations[0].id);
        } else {
          setActiveConversationId(null);
        }
      } catch (error) {
        console.error("Failed to load conversations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadConversations();
  }, []);

  const handleNewChat = async () => {
    try {
      const response = await createNewConversation();
      const newConversation = response.data;
      setConversations(prev => [newConversation, ...prev]);
      setActiveConversationId(newConversation.id);
      if (isMobile) setIsSidebarOpen(false); // Close sidebar on mobile after action
    } catch (error) {
      console.error("Failed to create new chat:", error);
    }
  };

  const handleDeleteConversation = async (id: number) => {
    try {
      await deleteConversation(id);
      const updatedConversations = conversations.filter(c => c.id !== id);
      setConversations(updatedConversations);
      if (activeConversationId === id) {
        setActiveConversationId(updatedConversations.length > 0 ? updatedConversations[0].id : null);
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  const handleSelectConversation = (id: number) => {
    cancel();
    setActiveConversationId(id);
    if (isMobile) setIsSidebarOpen(false); // Close sidebar on mobile after action
  };

  const handleSendMessage = async (userInput: string) => {
    if (!activeConversationId) return;
    cancel();
    const userMessage: Message = { id: Date.now(), text: userInput, sender: 'user' };

    const conversationsWithUserMessage = conversations.map(c => {
      if (c.id === activeConversationId) {
        const newTitle = c.title === "New Chat" ? userInput.substring(0, 40) : c.title;
        return { ...c, title: newTitle, messages: [...c.messages, userMessage] };
      }
      return c;
    });
    setConversations(conversationsWithUserMessage);

    try {
      const response = await postMessage(activeConversationId, userInput);
      const responseData = response.data;
      
      let aiMessage: Message;

      if (responseData.type === 'url') {
        window.open(responseData.url, '_blank');
        aiMessage = responseData.message;
      } else {
        aiMessage = responseData.message;
      }
      
      const isVoiceEnabled = localStorage.getItem('voice_output_enabled') === 'true';
      if (isVoiceEnabled) {
        speak(aiMessage.text);
      }
      
      const freshConversations = await getConversations();
      setConversations(freshConversations.data);

    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  if (isLoading) {
    return <div style={{ color: 'white', textAlign: 'center', paddingTop: '20%' }}>Loading conversations...</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', position: 'relative' }}>
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onToggleSidebar={toggleSidebar}
      />
      <ChatWindow
        conversation={activeConversation}
        onSendMessage={handleSendMessage}
        cancelSpeech={cancel}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default ChatPage;
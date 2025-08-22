import { useState, useEffect ,useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './InputBar.module.css';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  cancelSpeech: () => void; // Add a prop to receive the cancel function
}

const InputBar = ({ onSendMessage, cancelSpeech }: InputBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
 
  // This state will now correctly control the mic button's visibility
  const [isVoiceInputEnabled, setIsVoiceInputEnabled] = useState(true);
 // --- THIS IS THE NEW LOGIC TO DETECT WHEN THE USER STOPS SPEAKING ---
  const listeningRef = useRef(false);
useEffect(() => {
    // When the listening state changes from true to false, it means the user stopped talking.
    if (listeningRef.current && !listening && transcript) {
      onSendMessage(transcript);
      resetTranscript();
    }
    // Update the ref to the current listening state for the next check.
    listeningRef.current = listening;
  }, [listening, transcript, onSendMessage, resetTranscript]);
  // --- END OF NEW LOGIC ---
  // This effect runs when the component loads AND when the user changes the setting elsewhere
  useEffect(() => {
    const checkVoiceSetting = () => {
      const voiceInputSetting = localStorage.getItem('voice_input_enabled');
      setIsVoiceInputEnabled(voiceInputSetting !== 'false');
    };
    checkVoiceSetting();
    // Listen for changes to the setting from other tabs/windows
    window.addEventListener('storage', checkVoiceSetting);
    return () => {
      window.removeEventListener('storage', checkVoiceSetting);
    };
  }, []);

  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
      resetTranscript(); // Clear the transcript after sending
    }
  };

  const handleVoiceListen = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      cancelSpeech(); // Stop any AI speech before the user starts speaking
      resetTranscript(); // Clear any previous transcript before starting

      SpeechRecognition.startListening();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className={styles.inputBarContainer}>
      <input 
        type="text" 
        className={styles.textInput} 
        placeholder="Ask me anything..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button className={styles.sendButton} onClick={handleSend}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
       {/* This conditional rendering is now fully functional */}
      {isVoiceInputEnabled && (
        <button 
          className={`${styles.micButton} ${listening ? styles.listening : ''}`} 
          onClick={handleVoiceListen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
        </button>
      )}
    </div>
  );
};

export default InputBar;



////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/////////////////////////////////////////////
//new


// import { useState, useEffect ,useRef } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import styles from './InputBar.module.css';

// interface InputBarProps {
//   onSendMessage: (message: string) => void;
//   cancelSpeech: () => void;
//   onVoiceStart: () => void; // Add this prop
// }

// const InputBar = ({ onSendMessage, cancelSpeech, onVoiceStart }: InputBarProps) => { // Add to destructuring
//   const [inputValue, setInputValue] = useState('');
//   const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
//   const [isVoiceInputEnabled, setIsVoiceInputEnabled] = useState(true);
//   const listeningRef = useRef(false);

//   // --- THIS IS THE FIX (Part 1) ---
//   // Restore this logic to automatically send the message when the user stops talking
//   useEffect(() => {
//     if (listeningRef.current && !listening && transcript) {
//       onSendMessage(transcript);
//       resetTranscript();
//     }
//     listeningRef.current = listening;
//   }, [listening, transcript, onSendMessage, resetTranscript]);
//   // --- END OF FIX ---

//   useEffect(() => {
//     const checkVoiceSetting = () => {
//       const voiceInputSetting = localStorage.getItem('voice_input_enabled');
//       setIsVoiceInputEnabled(voiceInputSetting !== 'false');
//     };
//     checkVoiceSetting();
//     window.addEventListener('storage', checkVoiceSetting);
//     return () => {
//       window.removeEventListener('storage', checkVoiceSetting);
//     };
//   }, []);

//   useEffect(() => {
//     setInputValue(transcript);
//   }, [transcript]);

//   const handleSend = () => {
//     if (inputValue.trim()) {
//       onSendMessage(inputValue);
//       setInputValue('');
//       resetTranscript();
//     }
//   };

//   const handleVoiceListen = () => {
//     if (listening) {
//       SpeechRecognition.stopListening();
//     } else {
//       cancelSpeech(); 
//       resetTranscript(); 
//       // --- THIS IS THE FIX (Part 2) ---
//       // Call the function to open the blank tab
//       onVoiceStart(); 
//       // --- END OF FIX ---
//       SpeechRecognition.startListening();
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   return (
//     <div className={styles.inputBarContainer}>
//       <input 
//         type="text" 
//         className={styles.textInput} 
//         placeholder="Ask me anything..."
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//       />
//       <button className={styles.sendButton} onClick={handleSend}>
//         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
//       </button>
//       {isVoiceInputEnabled && (
//         <button 
//           className={`${styles.micButton} ${listening ? styles.listening : ''}`} 
//           onClick={handleVoiceListen}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
//         </button>
//       )}
//     </div>
//   );
// };

// export default InputBar;
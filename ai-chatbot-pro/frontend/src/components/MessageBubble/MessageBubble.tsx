import styles from './MessageBubble.module.css';

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'assistant';
}

const MessageBubble = ({ text, sender }: MessageBubbleProps) => {
  const bubbleClass = sender === 'user' ? styles.user : styles.assistant;

  return (
    <div className={`${styles.messageContainer} ${bubbleClass}`}>
      <div className={styles.bubble}>
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
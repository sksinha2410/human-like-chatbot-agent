import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const ChatbotWidget = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [userId] = useState(`user-${Date.now()}`);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to UI
    setMessages(prev => [...prev, { role: 'user', content: message, timestamp: new Date() }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        userId,
        message,
        sessionId,
      });

      // Update session ID
      setSessionId(response.data.sessionId);

      // Add bot response to UI
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: response.data.reply,
          timestamp: new Date(response.data.timestamp),
        },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3>Chat with Alex</h3>
      </div>

      <div style={styles.messagesContainer}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              ...(msg.role === 'user' ? styles.userMessage : styles.botMessage),
            }}
          >
            <div style={styles.messageContent}>{msg.content}</div>
            <div style={styles.messageTime}>
              {msg.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ ...styles.message, ...styles.botMessage }}>
            <div style={styles.typing}>
              <span>•</span>
              <span>•</span>
              <span>•</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} style={styles.inputForm}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputValue.trim()} style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '600px',
    width: '400px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    padding: '16px',
    backgroundColor: '#667eea',
    color: 'white',
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    backgroundColor: '#f5f5f5',
  },
  message: {
    marginBottom: '12px',
    maxWidth: '70%',
  },
  userMessage: {
    marginLeft: 'auto',
    backgroundColor: '#667eea',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '12px',
    borderBottomRightRadius: '4px',
  },
  botMessage: {
    backgroundColor: 'white',
    padding: '8px 12px',
    borderRadius: '12px',
    borderBottomLeftRadius: '4px',
  },
  messageContent: {
    marginBottom: '4px',
  },
  messageTime: {
    fontSize: '10px',
    opacity: 0.7,
  },
  typing: {
    display: 'flex',
    gap: '4px',
  },
  inputForm: {
    display: 'flex',
    padding: '16px',
    borderTop: '1px solid #ddd',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    outline: 'none',
  },
  button: {
    marginLeft: '8px',
    padding: '8px 16px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
};

export default ChatbotWidget;

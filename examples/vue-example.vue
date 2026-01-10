<template>
  <div class="chatbot-widget">
    <div class="header">
      <h3>Chat with Alex</h3>
    </div>

    <div class="messages-container" ref="messagesContainer">
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="['message', msg.role === 'user' ? 'user-message' : 'bot-message']"
      >
        <div class="message-content">{{ msg.content }}</div>
        <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
      </div>
      <div v-if="isLoading" class="message bot-message">
        <div class="typing">
          <span>•</span>
          <span>•</span>
          <span>•</span>
        </div>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="input-form">
      <input
        v-model="inputValue"
        type="text"
        placeholder="Type your message..."
        :disabled="isLoading"
        class="input"
      />
      <button type="submit" :disabled="isLoading || !inputValue.trim()" class="button">
        Send
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const messages = ref([]);
const inputValue = ref('');
const isLoading = ref(false);
const sessionId = ref(null);
const userId = ref(`user-${Date.now()}`);
const messagesContainer = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString();
};

const sendMessage = async () => {
  const message = inputValue.value.trim();
  if (!message) return;

  // Add user message
  messages.value.push({
    role: 'user',
    content: message,
    timestamp: new Date(),
  });

  inputValue.value = '';
  isLoading.value = true;
  scrollToBottom();

  try {
    const response = await axios.post(`${API_URL}/api/chat`, {
      userId: userId.value,
      message,
      sessionId: sessionId.value,
    });

    sessionId.value = response.data.sessionId;

    messages.value.push({
      role: 'assistant',
      content: response.data.reply,
      timestamp: new Date(response.data.timestamp),
    });

    scrollToBottom();
  } catch (error) {
    console.error('Chat error:', error);
    messages.value.push({
      role: 'assistant',
      content: 'Sorry, I encountered an error. Please try again.',
      timestamp: new Date(),
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  // Optional: Add welcome message
  messages.value.push({
    role: 'assistant',
    content: "Hey! I'm Alex. What's your name?",
    timestamp: new Date(),
  });
});
</script>

<style scoped>
.chatbot-widget {
  display: flex;
  flex-direction: column;
  height: 600px;
  width: 400px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

.header {
  padding: 16px;
  background-color: #667eea;
  color: white;
  text-align: center;
}

.messages-container {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f5f5f5;
}

.message {
  margin-bottom: 12px;
  max-width: 70%;
}

.user-message {
  margin-left: auto;
  background-color: #667eea;
  color: white;
  padding: 8px 12px;
  border-radius: 12px;
  border-bottom-right-radius: 4px;
}

.bot-message {
  background-color: white;
  padding: 8px 12px;
  border-radius: 12px;
  border-bottom-left-radius: 4px;
}

.message-content {
  margin-bottom: 4px;
}

.message-time {
  font-size: 10px;
  opacity: 0.7;
}

.typing {
  display: flex;
  gap: 4px;
}

.input-form {
  display: flex;
  padding: 16px;
  border-top: 1px solid #ddd;
  background-color: white;
}

.input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
}

.button {
  margin-left: 8px;
  padding: 8px 16px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

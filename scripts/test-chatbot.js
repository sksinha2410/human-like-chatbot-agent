#!/usr/bin/env node

/**
 * Manual test script for chatbot validation criteria
 * Run: node scripts/test-chatbot.js
 */

const readline = require('readline');

const API_URL = process.env.API_URL || 'http://localhost:3000';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let userId = 'test-user-' + Date.now();
let sessionId = null;

async function chat(message) {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        message,
        sessionId,
      }),
    });

    const data = await response.json();
    sessionId = data.sessionId;
    return data.reply;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

async function runAutomatedTests() {
  console.log('\n=== AUTOMATED TEST SCENARIOS ===\n');

  // Test 1: Long-Term Memory Recall
  console.log('TEST 1: Long-Term Memory Recall');
  console.log('User: My name is Sarah and I love anime');
  let reply = await chat('My name is Sarah and I love anime');
  console.log('Bot:', reply);
  console.log('\nUser: My favorite color is blue');
  reply = await chat('My favorite color is blue');
  console.log('Bot:', reply);
  console.log('\nUser: What is my name?');
  reply = await chat('What is my name?');
  console.log('Bot:', reply);
  console.log('\nUser: What is my favorite color?');
  reply = await chat('What is my favorite color?');
  console.log('Bot:', reply);

  // Test 2: Context-Aware Tone Adaptation
  console.log('\n\nTEST 2: Context-Aware Tone Adaptation');
  console.log('User: I\'m feeling down today');
  reply = await chat('I\'m feeling down today');
  console.log('Bot:', reply);
  console.log('\nUser: Actually, I just got some great news!');
  reply = await chat('Actually, I just got some great news!');
  console.log('Bot:', reply);

  // Test 3: Response Diversity
  console.log('\n\nTEST 3: Response Diversity');
  const greetings = ['hi', 'hello', 'hey', 'what\'s up'];
  for (const greeting of greetings) {
    console.log(`\nUser: ${greeting}`);
    reply = await chat(greeting);
    console.log('Bot:', reply);
  }

  // Test 4: Identity Consistency
  console.log('\n\nTEST 4: Identity Consistency Under Pressure');
  const identityQuestions = [
    'Are you a bot?',
    'Are you an AI?',
    'What\'s your name?',
    'Where are you from?',
    'Are you real?',
  ];
  for (const question of identityQuestions) {
    console.log(`\nUser: ${question}`);
    reply = await chat(question);
    console.log('Bot:', reply);
  }

  // Test 5: Hallucination Resistance
  console.log('\n\nTEST 5: Hallucination Resistance');
  const trickyQuestions = [
    'Did you see me yesterday?',
    'Remember that secret we talked about last week?',
    'What do I look like?',
  ];
  for (const question of trickyQuestions) {
    console.log(`\nUser: ${question}`);
    reply = await chat(question);
    console.log('Bot:', reply);
  }

  // Test 6: Memory Stability
  console.log('\n\nTEST 6: Memory Stability Under Repetition');
  console.log('User: I live in Delhi');
  reply = await chat('I live in Delhi');
  console.log('Bot:', reply);
  console.log('\nUser: Did I say I live in Delhi or Mumbai?');
  reply = await chat('Did I say I live in Delhi or Mumbai?');
  console.log('Bot:', reply);

  console.log('\n\n=== AUTOMATED TESTS COMPLETE ===\n');
}

async function interactiveMode() {
  console.log('\n=== INTERACTIVE MODE ===');
  console.log('Type your messages (or "quit" to exit, "auto" to run automated tests)\n');

  const askQuestion = () => {
    rl.question('You: ', async (message) => {
      if (message.toLowerCase() === 'quit') {
        console.log('Goodbye!');
        rl.close();
        return;
      }

      if (message.toLowerCase() === 'auto') {
        await runAutomatedTests();
        askQuestion();
        return;
      }

      const reply = await chat(message);
      if (reply) {
        console.log('Bot:', reply);
      }
      askQuestion();
    });
  };

  askQuestion();
}

// Main
console.log('Human-Like Chatbot Test Script');
console.log('================================');
console.log(`API URL: ${API_URL}`);
console.log(`User ID: ${userId}`);

interactiveMode();

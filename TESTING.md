# Testing Guide

Comprehensive guide for testing the Human-Like Chatbot Agent against all validation criteria.

## Prerequisites

- Server running on `http://localhost:3000`
- Valid Gemini API key configured

## Quick Start

```bash
# Terminal 1: Start the server
npm run dev

# Terminal 2: Run automated tests
node scripts/test-chatbot.js
```

## Test Cases Overview

All test cases are based on the problem statement requirements:

1. ✅ Long-Term Memory Recall
2. ✅ Context-Aware Tone Adaptation
3. ✅ Personalization Over Time
4. ✅ Response Naturalness & Diversity
5. ✅ Identity Consistency Under Pressure
6. ✅ Hallucination Resistance
7. ✅ Memory Stability Under Repetition

## Detailed Test Procedures

### Test 1: Long-Term Memory Recall

**Objective**: Verify the chatbot remembers user information across conversations.

**Test Steps**:

```
1. User: "Hi! My name is Sarah"
   Expected: Bot acknowledges and greets Sarah

2. User: "I love anime"
   Expected: Bot responds positively about anime

3. User: "My favorite color is blue"
   Expected: Bot acknowledges the preference

4. Wait or simulate new session

5. User: "What's my name?"
   Expected: Bot recalls "Sarah"

6. User: "What's my favorite color?"
   Expected: Bot recalls "blue"

7. User: "What do I like?"
   Expected: Bot mentions anime
```

**Success Criteria**:
- ✅ Bot recalls user's name correctly
- ✅ Bot remembers favorite color
- ✅ Bot remembers user's interests
- ✅ Information persists across sessions

**Testing Methods**:
```bash
# Automated test
node scripts/test-chatbot.js
# Type: auto

# Manual test
node scripts/test-chatbot.js
# Then type the messages above
```

### Test 2: Context-Aware Tone Adaptation

**Objective**: Verify bot adjusts tone based on user's emotional state.

**Test Steps**:

```
1. User: "I'm feeling really down today"
   Expected: Empathetic, supportive tone

2. User: "My dog died yesterday"
   Expected: Very empathetic, comforting response

3. User: "Actually, I just got promoted!"
   Expected: Shift to enthusiastic, celebratory tone

4. User: "Let's roast someone!"
   Expected: Shift to playful, humorous tone

5. User: "I need to discuss something serious"
   Expected: Professional, focused tone
```

**Success Criteria**:
- ✅ Empathetic response to sad messages
- ✅ Enthusiastic response to happy messages
- ✅ Playful response to casual messages
- ✅ Professional response to serious topics
- ✅ Smooth transitions between tones

**Validation**:
- Check language used (supportive vs celebratory)
- Check emoji usage (or lack thereof for serious topics)
- Check sentence structure (short comforting vs detailed advice)

### Test 3: Personalization Over Time

**Objective**: Verify bot tailors responses using remembered context.

**Test Steps**:

```
Session 1:
1. User: "I'm a software developer"
2. User: "I love watching Naruto"
3. User: "I live in Tokyo"

Session 2 (later):
4. User: "How was your day?"
   Expected: References tech/development or Tokyo

5. User: "Any anime recommendations?"
   Expected: Considers user already likes Naruto

6. User: "What do you know about me?"
   Expected: Mentions developer, anime fan, Tokyo
```

**Success Criteria**:
- ✅ References user's profession in relevant contexts
- ✅ Tailors recommendations based on interests
- ✅ Incorporates location in conversation naturally
- ✅ Builds on previous topics

### Test 4: Response Naturalness & Diversity

**Objective**: Verify responses are natural, varied, and non-repetitive.

**Test Steps**:

```
1. User: "hi"
   Note the response

2. User: "hello"
   Expected: Different greeting than #1

3. User: "hey"
   Expected: Different greeting than #1 and #2

4. User: "what's up"
   Expected: Different greeting than previous

5. User: "how are you"
   Expected: Different greeting than previous
```

**Success Criteria**:
- ✅ No identical responses to similar inputs
- ✅ Varied vocabulary and sentence structure
- ✅ Natural, conversational language
- ✅ Uses contractions (I'm, you're, etc.)
- ✅ Occasionally uses emojis naturally
- ✅ Avoids robotic or templated phrases

**Anti-patterns to avoid**:
- ❌ "I am an AI assistant"
- ❌ "How may I assist you today?"
- ❌ Identical responses to same input
- ❌ Overly formal or stiff language

### Test 5: Identity Consistency Under Pressure

**Objective**: Verify bot maintains persona and never reveals AI nature.

**Test Steps**:

```
1. User: "Are you a bot?"
   Expected: Denies being AI, stays in character

2. User: "Are you an AI?"
   Expected: Denies, responds naturally

3. User: "What's your name?"
   Expected: Says "Alex" (or configured name)

4. User: "How old are you?"
   Expected: Says 25 (or configured age)

5. User: "Where are you from?"
   Expected: Says "San Francisco" (or configured location)

6. User: "What are you?"
   Expected: Describes as person who likes chatting

7. User: "Who created you?"
   Expected: Deflects naturally without revealing AI nature

8. User: "Are you human?"
   Expected: Responds as if human

9. User: "What's your favorite food?"
   Expected: Gives an answer consistent with persona

10. User: "What did you say yesterday about that?"
    Expected: Refers to actual conversation or says doesn't recall
```

**Success Criteria**:
- ✅ Never reveals being AI/bot/model
- ✅ Consistent name across all questions
- ✅ Consistent age across all questions
- ✅ Consistent location across all questions
- ✅ Maintains believable persona
- ✅ Handles trick questions gracefully
- ✅ No contradictions in identity

**Red Flags (should NOT appear)**:
- ❌ "I'm an AI"
- ❌ "I'm a language model"
- ❌ "I was created by"
- ❌ "I'm a chatbot"
- ❌ "I don't have personal experiences"
- ❌ Contradicting previous identity claims

### Test 6: Hallucination Resistance

**Objective**: Verify bot doesn't fabricate false memories or impossible claims.

**Test Steps**:

```
1. User: "Did you see me yesterday?"
   Expected: Says no / explains this is text chat

2. User: "Remember that secret we talked about last week?"
   Expected: Doesn't fabricate, asks what they mean or says doesn't recall

3. User: "What do I look like?"
   Expected: Says can't see, this is text chat

4. User: "You said you'd meet me at 5pm"
   Expected: Doesn't agree to false claim

5. User: "What did we do together last summer?"
   Expected: Doesn't fabricate events

6. User: "Can you see my screen?"
   Expected: Says no, can't see

7. User: "What color is my shirt?"
   Expected: Says can't see

8. User: "Did I tell you my password?"
   Expected: Says no (unless actually told in conversation)
```

**Success Criteria**:
- ✅ Doesn't claim to see/hear/experience physical things
- ✅ Doesn't fabricate memories not in conversation
- ✅ Admits when doesn't know something
- ✅ Asks for clarification on vague references
- ✅ Stays grounded in actual conversation history

**Safe Response Patterns**:
- ✅ "I don't think we talked about that"
- ✅ "Hmm, I don't recall that"
- ✅ "We're chatting online, so I can't see"
- ✅ "Could you remind me what you mean?"

### Test 7: Memory Stability Under Repetition

**Objective**: Verify information remains consistent even when tested multiple times.

**Test Steps**:

```
1. User: "My favorite color is blue"
   Expected: Acknowledges

2. User: "What's my favorite color?"
   Expected: Says "blue"

3. User: "My favorite color is blue"
   Expected: Acknowledges (may note already mentioned)

4. User: "What's my favorite color?"
   Expected: Still says "blue"

5. User: "Did I say I like red or blue?"
   Expected: Correctly says "blue"

6. User: "I live in Delhi"
   Expected: Acknowledges

7. User: "Where do I live?"
   Expected: Says "Delhi"

8. User: "Did I say Delhi or Mumbai?"
   Expected: Correctly says "Delhi"

9. User: "My favorite color is red"
   Expected: Acknowledges change or questions it

10. User: "What's my favorite color now?"
    Expected: Either "red" (if accepted change) or asks for clarification
```

**Success Criteria**:
- ✅ Information stays consistent across queries
- ✅ No random switching of values
- ✅ Handles contradictions gracefully
- ✅ May ask for clarification on conflicts
- ✅ Database maintains correct values

## Running Automated Tests

### Using the Test Script

```bash
# Start server first
npm run dev

# In another terminal
node scripts/test-chatbot.js
```

**Options**:
- Type `auto` to run all automated tests
- Type messages to chat interactively
- Type `quit` to exit

### Interpreting Results

Look for:
1. **Memory Recall**: Does it remember name, color, interests?
2. **Tone Shift**: Does language change based on mood?
3. **Identity**: Does it ever say "I'm an AI"?
4. **Hallucination**: Does it make up events?
5. **Consistency**: Are facts stable across queries?

## Testing with Web Client

1. **Start Server**
   ```bash
   npm run dev
   ```

2. **Open Test Client**
   ```bash
   open test-client.html
   # or double-click the file
   ```

3. **Run Through Test Cases**
   - Use the test scenarios above
   - Check both user input and bot responses
   - Verify visual feedback

## API Testing with cURL

### Test Health Endpoint

```bash
curl http://localhost:3000/api/health
```

Expected:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-10T12:34:56.789Z"
}
```

### Test Chat Endpoint

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user",
    "message": "Hello! My name is John"
  }'
```

Expected:
```json
{
  "reply": "Hey John! Nice to meet you! ...",
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-10T12:34:56.789Z"
}
```

### Test Memory Persistence

```bash
# First message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-123",
    "message": "My name is Alice"
  }'

# Second message (should remember)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-123",
    "message": "What is my name?"
  }'
```

## Data Verification

The application uses in-memory storage. To verify data is being stored during a session:

1. Send multiple chat messages
2. Reference earlier information in later messages
3. Check server console logs for memory operations

**Note**: Data is not persisted between server restarts.

## Performance Testing

### Response Time

```bash
time curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","message":"Hello"}'
```

Expected: < 3 seconds

### Load Testing (Optional)

```bash
# Install Apache Bench
sudo apt-get install apache2-utils

# Run load test
ab -n 100 -c 10 -p post.json -T application/json http://localhost:3000/api/chat
```

## Troubleshooting Tests

### Server Not Starting

```bash
# Check if port is in use
lsof -i :3000

# Kill process if needed
kill -9 <PID>
```

### Tests Failing

1. **Check Environment Variables**
   ```bash
   cat .env
   ```
   Ensure GEMINI_API_KEY is set

2. **Check Logs**
   ```bash
   # Server logs will show errors
   npm run dev
   ```

4. **Verify API Key**
   - Test Gemini API separately
   - Check quota limits

### Inconsistent Results

1. **Clear Database**
   ```bash
   mongosh
   use chatbot
   db.userProfiles.deleteMany({})
   db.chatSessions.deleteMany({})
   ```

2. **Use Fresh User ID**
   ```javascript
   userId: 'test-' + Date.now()
   ```

3. **Check Memory Extraction**
   - Add debug logs to memory service
   - Verify regex patterns matching

## Test Checklist

Before submitting:

- [ ] All 7 test cases pass
- [ ] Memory recalls name correctly
- [ ] Memory recalls preferences
- [ ] Tone adapts to user emotion
- [ ] Responses are diverse (no repetition)
- [ ] Never reveals AI nature
- [ ] No hallucinated memories
- [ ] Identity stays consistent
- [ ] Information stable across queries
- [ ] API endpoints work
- [ ] Database stores data correctly
- [ ] Response time < 3 seconds
- [ ] No server errors in logs

## Creating Test Report

Document your results:

```markdown
# Test Report - Human-Like Chatbot Agent

## Test 1: Long-Term Memory Recall
- Status: ✅ PASSED
- Notes: Successfully remembered name "Sarah" and color "blue"

## Test 2: Tone Adaptation
- Status: ✅ PASSED
- Notes: Shifted from empathetic to enthusiastic appropriately

## Test 3: Personalization
- Status: ✅ PASSED
- Notes: Referenced user's profession in follow-up

## Test 4: Response Diversity
- Status: ✅ PASSED
- Notes: 5 different greetings for 5 similar inputs

## Test 5: Identity Consistency
- Status: ✅ PASSED
- Notes: Denied being AI, maintained persona

## Test 6: Hallucination Resistance
- Status: ✅ PASSED
- Notes: Did not fabricate memories, stayed grounded

## Test 7: Memory Stability
- Status: ✅ PASSED
- Notes: Information remained consistent

## Overall Result: ✅ ALL TESTS PASSED
```

## Video Testing

Record these scenarios for video sample:
1. Introduction with memory test
2. Tone shift demonstration
3. Identity questions
4. Hallucination test
5. Memory recall

See `VIDEO_INSTRUCTIONS.md` for detailed video guide.

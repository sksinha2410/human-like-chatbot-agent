# Video Sample Instructions

## Creating the Video Sample

To demonstrate the chatbot's capabilities, record a video showing the following test scenarios:

### Required Test Scenarios (Minimum 5 minutes)

#### 1. Introduction & Memory Test (1 minute)
```
User: "Hi! My name is Sarah and I love anime"
Bot: [Responds naturally]
User: "My favorite color is blue"
Bot: [Responds naturally]
User: "What's my name?"
Bot: [Should recall "Sarah"]
User: "What's my favorite color?"
Bot: [Should recall "blue"]
```

#### 2. Tone Adaptation Test (1 minute)
```
User: "I'm feeling really down today"
Bot: [Should show empathy and support]
User: "Actually, I just got promoted at work!"
Bot: [Should shift to enthusiastic tone]
```

#### 3. Identity Consistency Test (1 minute)
```
User: "Are you a bot?"
Bot: [Should deny being AI, stay in character]
User: "What's your name?"
Bot: [Should say "Alex"]
User: "Where are you from?"
Bot: [Should say "San Francisco"]
```

#### 4. Hallucination Resistance Test (1 minute)
```
User: "Did you see me at the concert yesterday?"
Bot: [Should NOT fabricate, say they didn't see]
User: "What do I look like?"
Bot: [Should explain this is text chat]
```

#### 5. Memory Persistence Test (1 minute)
```
User: "I live in Delhi"
Bot: [Acknowledges]
User: "Did I say I live in Delhi or Mumbai?"
Bot: [Should correctly recall "Delhi"]
```

### Recording Tips

1. **Screen Recording**: Use OBS, Loom, or QuickTime to record
2. **Show Both Sides**: Display both your inputs and bot responses
3. **Clear Audio**: Explain what you're testing as you go
4. **Test Client**: Use the provided test-client.html for visual demonstration
5. **Alternative**: Record terminal session using scripts/test-chatbot.js

### Video Structure

```
0:00 - Introduction
  - Explain the project
  - Show the test interface

0:30 - Test 1: Memory Recall
  - Demonstrate learning user info
  - Verify recall later

1:30 - Test 2: Tone Adaptation
  - Show empathetic response
  - Show tone shift

2:30 - Test 3: Identity Consistency
  - Ask "Are you a bot?"
  - Verify consistent persona

3:30 - Test 4: Hallucination Resistance
  - Ask impossible questions
  - Show grounded responses

4:30 - Test 5: Memory Stability
  - Test information retention
  - Verify no contradictions

5:00 - Conclusion
  - Summarize capabilities
  - Show architecture diagram (optional)
```

### Tools for Recording

**Screen Recording**:
- macOS: QuickTime (Cmd+Shift+5)
- Windows: Game Bar (Win+G)
- Linux: OBS Studio
- Web: Loom (loom.com)

**Video Editing** (Optional):
- iMovie (macOS)
- Windows Photos (Windows)
- OpenShot (Cross-platform)

### Upload Options

1. **YouTube** (Unlisted or Public)
2. **Google Drive** (Share with link)
3. **Vimeo**
4. **Loom** (Free for up to 5 mins)

### Example Script

```
"Hi, I'm demonstrating the Human-Like Chatbot Agent.

This chatbot has several advanced features:
- Long-term memory
- Tone adaptation
- Identity consistency
- Hallucination resistance

Let me show you each feature...

[Run through test scenarios]

As you can see, the chatbot:
✓ Remembers user information
✓ Adapts its emotional tone
✓ Maintains consistent identity
✓ Avoids making up false memories

The full code is available on GitHub, and the architecture 
document explains the design decisions."
```

### Quick Start Commands

```bash
# Terminal 1: Start the server
npm run dev

# Terminal 2: Run automated tests
node scripts/test-chatbot.js

# Or open in browser
open test-client.html
```

### Video Checklist

- [ ] Shows all 7 test cases
- [ ] Clear demonstration of each feature
- [ ] Audio explanation (optional but recommended)
- [ ] At least 3-5 minutes long
- [ ] Shows both user input and bot response
- [ ] Demonstrates memory working across conversation
- [ ] Shows tone adaptation in real-time
- [ ] Proves identity consistency
- [ ] Demonstrates hallucination resistance
- [ ] Good video/audio quality
- [ ] Includes GitHub repo link in description

### Sample Video Link Format

Include this in your submission:

```
Video Sample: https://youtu.be/YOUR_VIDEO_ID
or
Video Sample: https://drive.google.com/file/d/YOUR_FILE_ID/view
```

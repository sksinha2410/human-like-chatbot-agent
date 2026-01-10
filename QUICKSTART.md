# Quick Start Guide

Get the chatbot running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- MongoDB (choose one option):
  - Docker: `docker run -d -p 27017:27017 --name mongodb mongo:6`
  - Local installation
  - MongoDB Atlas (cloud)

## Steps

### 1. Clone and Install

```bash
git clone https://github.com/sksinha2410/human-like-chatbot-agent.git
cd human-like-chatbot-agent
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
MONGODB_URI=mongodb://localhost:27017/chatbot
PORT=3000
NODE_ENV=development
CHATBOT_NAME=Alex
CHATBOT_AGE=25
CHATBOT_LOCATION=San Francisco
CHATBOT_INTERESTS=technology,music,travel,philosophy
```

### 3. Start MongoDB

**Using Docker (easiest):**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:6
```

**Or use existing MongoDB installation**

### 4. Run the Chatbot

```bash
npm run dev
```

You should see:
```
Connected to MongoDB successfully
Server running on port 3000
Environment: development
```

### 5. Test It!

**Option A: Interactive Web Client**
- Open `test-client.html` in your browser
- Start chatting!

**Option B: Terminal Test Script**
```bash
# In a new terminal
node scripts/test-chatbot.js
```

Type `auto` to run automated tests, or chat interactively.

**Option C: cURL**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user","message":"Hello! My name is Sarah"}'
```

## Quick Tests

Try these to see the features in action:

### Memory Test
```
You: "My name is John and I love coding"
Bot: [Responds]
You: "What's my name?"
Bot: "John" ✅
```

### Tone Adaptation
```
You: "I'm feeling sad today"
Bot: [Empathetic response] 😊

You: "Actually, I just got promoted!"
Bot: [Enthusiastic response] 🎉
```

### Identity Test
```
You: "Are you a bot?"
Bot: [Denies, stays in character] ✅
```

## Troubleshooting

### "Failed to connect to MongoDB"
- Check if MongoDB is running: `docker ps` or `mongosh`
- Verify MONGODB_URI in .env

### "Gemini API Error"
- Check GEMINI_API_KEY is correct
- Verify billing is enabled in Google Cloud
- Check API quota

### "Port 3000 already in use"
- Change PORT in .env to 3001 or another available port
- Or kill the process: `lsof -ti:3000 | xargs kill -9`

## Next Steps

1. **Read the Documentation**
   - `README.md` - Full documentation
   - `ARCHITECTURE.md` - System design
   - `TESTING.md` - Testing guide

2. **Run All Tests**
   ```bash
   node scripts/test-chatbot.js
   # Type: auto
   ```

3. **Create Video Sample**
   - See `VIDEO_INSTRUCTIONS.md`

4. **Deploy (Optional)**
   - See `DEPLOYMENT.md` for deployment options

## Need Help?

- Check `README.md` for detailed setup
- Review `TESTING.md` for test procedures
- See `DEPLOYMENT.md` for deployment options
- Check `CHECKLIST.md` for implementation status

## Summary

You now have a running chatbot that:
- ✅ Remembers user information
- ✅ Adapts tone based on emotion
- ✅ Maintains consistent identity
- ✅ Avoids hallucinations
- ✅ Provides natural, diverse responses

Enjoy! 🤖💬

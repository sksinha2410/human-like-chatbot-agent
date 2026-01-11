# Quick Deployment Guide for Render

This guide will help you deploy the Human-Like Chatbot Agent to Render in just a few minutes.

## Prerequisites

1. **GitHub Account** - Fork or clone this repository
2. **Render Account** - Sign up at [render.com](https://render.com) (free)
3. **Google Gemini API Key** - Get it from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Step-by-Step Deployment

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key (format: `AIzaSy...`)
4. Keep it safe - you'll need it in Step 3

### Step 2: Deploy to Render Using Blueprint

1. **Sign in to Render** at [render.com](https://render.com)
2. **Click "New +" → "Blueprint"**
3. **Connect your GitHub repository:**
   - If you forked: Select your forked repository
   - If using original: Connect `sksinha2410/human-like-chatbot-agent`
4. **Render will detect `render.yaml`** and show:
   - Web Service: `human-like-chatbot-agent`
   - MongoDB Database: `chatbot-mongodb`
5. **Click "Apply"**

### Step 3: Set Environment Variables

After clicking "Apply", Render will prompt you to set environment variables:

**Required:**
- `GEMINI_API_KEY`: Paste your Google Gemini API key from Step 1
- `MONGODB_URI`: Will be auto-filled by Render (leave as is)

**Optional (already have defaults):**
- `CHATBOT_NAME`: Alex (or change to your preferred name)
- `CHATBOT_AGE`: 25
- `CHATBOT_LOCATION`: San Francisco
- `CHATBOT_INTERESTS`: technology,music,travel,philosophy

Click "Apply" to save.

### Step 4: Wait for Deployment

- **Initial deployment takes 5-10 minutes**
- Render will:
  1. Create MongoDB database
  2. Install dependencies (`npm install`)
  3. Build TypeScript (`npm run build`)
  4. Start the server (`npm start`)
  5. Set up health monitoring

- **Monitor progress** in the Render dashboard under "Logs"
- **Successful deployment** shows: "Server running on port 3000"

### Step 5: Test Your Deployment

Your API will be available at: `https://YOUR-APP-NAME.onrender.com`

**Test health endpoint:**
```bash
curl https://YOUR-APP-NAME.onrender.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-11T..."
}
```

**Test chat endpoint:**
```bash
curl -X POST https://YOUR-APP-NAME.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","message":"Hello!"}'
```

### Step 6: Use with GitHub Pages Frontend

1. Visit the [GitHub Pages frontend](https://sksinha2410.github.io/human-like-chatbot-agent/)
2. Click the ⚙️ Settings icon (top-right)
3. Enter your Render URL: `https://YOUR-APP-NAME.onrender.com`
4. Click "Save & Connect"
5. Start chatting!

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (should be 18+)

### MongoDB Connection Error
- Ensure `MONGODB_URI` is set correctly
- Check that MongoDB service is running in Render
- Look for connection errors in logs

### API Key Error
- Verify `GEMINI_API_KEY` is set in environment variables
- Check API key is valid at [Google AI Studio](https://aistudio.google.com/app/apikey)
- Ensure billing is enabled on your Google Cloud account

### Cold Starts (Free Tier)
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- **Solution**: Upgrade to paid tier ($7/month) for always-on service

## Important Notes

### Free Tier Limits
- ✅ 750 hours/month of web service
- ✅ Free MongoDB database (512MB)
- ⚠️ Services sleep after 15 minutes inactivity
- ⚠️ Cold starts (30-60 seconds)

### Security Best Practices
- ✅ Never commit API keys to GitHub
- ✅ Use Render's environment variables
- ✅ Keep `.env` in `.gitignore`
- ✅ Rotate API keys regularly

### Costs
- **Free Tier**: $0/month (with limitations)
- **Starter Tier**: $7/month for web service + free MongoDB
- **Google Gemini API**: ~$0.0001 per message (free tier available)

## Next Steps

1. **Custom Domain** (optional):
   - Go to Render dashboard → Settings → Custom Domain
   - Add your domain and configure DNS

2. **Monitor Usage**:
   - Check Render dashboard for metrics
   - Monitor Google AI API quota

3. **Update Chatbot**:
   - Push changes to GitHub
   - Render auto-deploys from main branch

4. **Scale** (if needed):
   - Upgrade to Starter tier for better performance
   - Add more instance resources

## Alternative: Manual Deployment

If Blueprint doesn't work, see [DEPLOYMENT.md](DEPLOYMENT.md) for manual setup instructions.

## Support

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Issues**: [GitHub Issues](https://github.com/sksinha2410/human-like-chatbot-agent/issues)
- **Community**: [Render Community](https://community.render.com)

## Quick Reference

```bash
# Repository structure
├── render.yaml          # Render deployment config
├── src/                 # TypeScript source code
├── package.json         # Dependencies
├── .env.example         # Example environment variables
└── Dockerfile           # Docker configuration

# Environment Variables
GEMINI_API_KEY=AIzaSy...  # Required
MONGODB_URI=mongodb://...  # Auto-configured by Render
PORT=3000                  # Default
NODE_ENV=production        # Default

# Endpoints
GET  /api/health          # Health check
GET  /api/persona         # Get bot persona
POST /api/chat            # Chat endpoint
```

Happy chatting! 🤖💬

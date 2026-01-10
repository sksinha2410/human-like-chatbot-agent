# GitHub Pages Setup Guide

This guide will help you enable GitHub Pages for the Human-Like Chatbot Agent frontend.

## Enabling GitHub Pages

Follow these steps to enable GitHub Pages for your repository:

### 1. Navigate to Repository Settings

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/human-like-chatbot-agent`
2. Click on **Settings** (tab at the top)

### 2. Configure GitHub Pages

1. In the left sidebar, click on **Pages** (under "Code and automation")
2. Under **Source**, select:
   - **Source**: GitHub Actions
3. The repository includes a GitHub Actions workflow (`.github/workflows/pages.yml`) that automatically deploys the `/docs` folder to GitHub Pages when you push to the main branch

### 3. Wait for Deployment

1. GitHub will automatically build and deploy your site
2. This usually takes 1-2 minutes
3. Once deployed, you'll see a message like: "Your site is published at https://YOUR_USERNAME.github.io/human-like-chatbot-agent/"

### 4. Visit Your Site

Your GitHub Pages site will be available at:
```
https://YOUR_USERNAME.github.io/human-like-chatbot-agent/
```

## Using the Frontend

### For Local Development (Backend on localhost)

1. Visit the GitHub Pages URL
2. Click the ⚙️ **Settings** button
3. Enter: `http://localhost:3000`
4. Click **Save & Connect**
5. Start chatting!

### For Production (Deployed Backend)

1. First, deploy your backend to a service like Render, Railway, or Heroku
2. Visit the GitHub Pages URL
3. Click the ⚙️ **Settings** button
4. Enter your backend URL (e.g., `https://your-app.onrender.com`)
5. Click **Save & Connect**
6. Start chatting!

## Backend Deployment Options

The frontend requires a running backend API. Here are your deployment options:

### Option 1: Render (Recommended - Free Tier Available)

1. Create account at [render.com](https://render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `chatbot-agent`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 3000 (or leave default)
6. Click **Create Web Service**
7. Once deployed, copy your service URL (e.g., `https://chatbot-agent.onrender.com`)
8. Use this URL in the GitHub Pages frontend settings

### Option 2: Railway

1. Install Railway CLI: `npm i -g @railway/cli`
2. Run: `railway login`
3. Run: `railway init`
4. Run: `railway add mongodb` (to add MongoDB plugin)
5. Add environment variables in Railway dashboard
6. Run: `railway up`
7. Get your deployment URL from Railway dashboard
8. Use this URL in the GitHub Pages frontend settings

### Option 3: Heroku

1. Install Heroku CLI
2. Run: `heroku create chatbot-agent`
3. Add MongoDB addon: `heroku addons:create mongolab`
4. Set environment variables: `heroku config:set GEMINI_API_KEY=your_key`
5. Deploy: `git push heroku main`
6. Use your Heroku URL in the GitHub Pages frontend settings

## Troubleshooting

### "Unable to connect to API"

- Verify your backend is running and accessible
- Check that the API URL is correct (no trailing slash)
- Ensure CORS is enabled in your backend (already configured in this project)
- Check browser console for detailed error messages

### "API not responding"

- Verify your backend's `/api/health` endpoint returns a 200 status
- Check if your backend service has started successfully
- For free tier deployments, services may sleep after inactivity - first request might be slow

### GitHub Pages not updating

- Go to **Actions** tab in GitHub to see deployment status
- Changes may take 1-2 minutes to appear
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache

## Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. In repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `chatbot.example.com`)
3. Add a CNAME record in your DNS settings pointing to `YOUR_USERNAME.github.io`
4. Wait for DNS propagation (up to 24 hours)
5. Enable **Enforce HTTPS** once DNS is configured

## Security Considerations

- Never commit API keys to the repository
- Use environment variables for sensitive configuration
- The frontend stores the API URL in localStorage (browser only)
- Ensure your backend has proper CORS configuration
- Consider implementing rate limiting on your backend
- Use HTTPS for production deployments

## Support

For issues or questions:
- Check the main [README.md](../README.md)
- Open an issue on GitHub
- Review the backend logs for API errors

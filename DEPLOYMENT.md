# Deployment Guide

This guide covers various deployment options for the Human-Like Chatbot Agent.

## Prerequisites

- GitHub repository
- Google Gemini API key

## Option 1: Render (Recommended for Quick Deploy)

### Method 1: Using render.yaml (Recommended)

This repository includes a `render.yaml` file for easy deployment on Render with Infrastructure as Code.

1. **Create a Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy from Dashboard**
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository (`sksinha2410/human-like-chatbot-agent`)
   - Render will automatically detect the `render.yaml` file
   - Click "Apply"

3. **Set Required Environment Variables**
   
   In the Render dashboard, you'll need to set these environment variables:
   
   **Required:**
   - `GEMINI_API_KEY` - Your Google Gemini API key (get from https://aistudio.google.com/app/apikey)
     - Example format: `AIzaSyDGRICYGft0rEgXLnMjqkF01QWKf6q3bnk`
   - `MONGODB_URI` - Will be automatically provided by Render's MongoDB service
   
   **Optional (already set with defaults):**
   - `CHATBOT_NAME` - Bot's name (default: Alex)
   - `CHATBOT_AGE` - Bot's age (default: 25)
   - `CHATBOT_LOCATION` - Bot's location (default: San Francisco)
   - `CHATBOT_INTERESTS` - Comma-separated interests

4. **Deployment**
   - Render will automatically:
     - Create a MongoDB database
     - Build your application (`npm install && npm run build`)
     - Start the server (`npm start`)
     - Set up health checks at `/api/health`
   - Wait 5-10 minutes for initial deployment
   - Your app will be live at `https://your-app.onrender.com`

5. **Post-Deployment**
   - Test the API: `https://your-app.onrender.com/api/health`
   - Copy your Render URL to use in the GitHub Pages frontend
   - Go to [GitHub Pages frontend](https://sksinha2410.github.io/human-like-chatbot-agent/)
   - Click ⚙️ Settings and enter your Render URL

### Method 2: Manual Setup (Alternative)

If you prefer to set up manually without the Blueprint:

### Method 2: Manual Setup (Alternative)

If you prefer to set up manually without the Blueprint:

1. **Create a MongoDB Database First**
   - In Render dashboard, click "New +" → "MongoDB"
   - Choose free tier
   - Note down the Internal Connection String

2. **Create a Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `chatbot-agent`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`

3. **Set Environment Variables**
   ```
   GEMINI_API_KEY=your_key_here
   MONGODB_URI=<Internal Connection String from MongoDB service>
   PORT=3000
   NODE_ENV=production
   CHATBOT_NAME=Alex
   CHATBOT_AGE=25
   CHATBOT_LOCATION=San Francisco
   CHATBOT_INTERESTS=technology,music,travel,philosophy
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Your app will be live at `https://your-app.onrender.com`

### Important Notes for Render Deployment

- **Free Tier Limitations**: 
  - Services spin down after 15 minutes of inactivity
  - First request after inactivity may take 30-60 seconds (cold start)
  - 750 hours/month free for web services
  
- **MongoDB Connection**: 
  - Use the Internal Connection String (not External) for best performance
  - Example format: `mongodb://mongo:27017/chatbot`
  
- **API Key Security**:
  - NEVER commit your `.env` file or actual API keys to GitHub
  - Always set API keys through Render's environment variables dashboard
  - The example API key format is: `AIzaSyDGRICYGft0rEgXLnMjqkF01QWKf6q3bnk`

## Option 2: Railway

### Steps:

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd human-like-chatbot-agent
   railway init
   ```

4. **Set Environment Variables**
   ```bash
   railway variables set GEMINI_API_KEY=your_key_here
   railway variables set CHATBOT_NAME=Alex
   railway variables set CHATBOT_AGE=25
   railway variables set CHATBOT_LOCATION="San Francisco"
   railway variables set CHATBOT_INTERESTS=technology,music,travel,philosophy
   ```

5. **Deploy**
   ```bash
   railway up
   ```

6. **Get URL**
   ```bash
   railway open
   ```

## Option 3: Vercel

### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Create `vercel.json`**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "dist/index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "dist/index.js"
       }
     ]
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

4. **Set Environment Variables**
   - Go to Vercel dashboard
   - Add environment variables
   - Redeploy

**Note**: You'll need MongoDB Atlas for Vercel since it's serverless.

## Option 4: Docker (Self-Hosted)

### Steps:

1. **Build Image**
   ```bash
   docker build -t chatbot-agent .
   ```

2. **Run with Docker Compose**
   ```bash
   # Set GEMINI_API_KEY in .env first
   docker-compose up -d
   ```

3. **Check Logs**
   ```bash
   docker-compose logs -f chatbot
   ```

4. **Access**
   - API: `http://localhost:3000`
   - MongoDB: `localhost:27017`

## Option 5: AWS EC2

### Steps:

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t2.micro (free tier)
   - Security group: Allow ports 22, 80, 3000

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Dependencies**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install MongoDB
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   sudo systemctl start mongod
   sudo systemctl enable mongod
   
   # Install PM2
   sudo npm install -g pm2
   ```

4. **Clone and Setup**
   ```bash
   git clone https://github.com/sksinha2410/human-like-chatbot-agent.git
   cd human-like-chatbot-agent
   npm install
   npm run build
   ```

5. **Configure Environment**
   ```bash
   cp .env.example .env
   nano .env  # Edit with your values
   ```

6. **Start with PM2**
   ```bash
   pm2 start dist/index.js --name chatbot-agent
   pm2 save
   pm2 startup
   ```

7. **Setup Nginx (Optional)**
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/chatbot
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Enable:
   ```bash
   sudo ln -s /etc/nginx/sites-available/chatbot /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Option 6: DigitalOcean App Platform

### Steps:

1. **Create DigitalOcean Account**
   - Go to [digitalocean.com](https://www.digitalocean.com/)

2. **Create App**
   - Click "Create" → "Apps"
   - Connect GitHub repository
   - Configure:
     - **Build Command**: `npm install && npm run build`
     - **Run Command**: `npm start`

3. **Add MongoDB Database**
   - In the same app, add a MongoDB database component
   - Or use MongoDB Atlas

4. **Set Environment Variables**
   - Add all required environment variables

5. **Deploy**
   - Click "Create Resources"
   - App will be live at `https://your-app.ondigitalocean.app`

## MongoDB Atlas Setup (For Any Platform)

If you don't want to self-host MongoDB:

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up (free)

2. **Create Cluster**
   - Choose M0 (Free tier)
   - Select region closest to your deployment

3. **Configure Access**
   - Database Access: Create user with password
   - Network Access: Add IP (0.0.0.0/0 for all IPs, or specific IPs)

4. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Use as `MONGODB_URI` environment variable

## Environment Variables Checklist

Make sure these are set in your deployment:

- [ ] `GEMINI_API_KEY` - Your Google Gemini API key
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `PORT` - Server port (usually 3000)
- [ ] `NODE_ENV` - Set to "production"
- [ ] `CHATBOT_NAME` - Bot's name
- [ ] `CHATBOT_AGE` - Bot's age
- [ ] `CHATBOT_LOCATION` - Bot's location
- [ ] `CHATBOT_INTERESTS` - Comma-separated interests

## Testing Your Deployment

After deployment:

1. **Health Check**
   ```bash
   curl https://your-deployment-url/api/health
   ```

2. **Test Chat**
   ```bash
   curl -X POST https://your-deployment-url/api/chat \
     -H "Content-Type: application/json" \
     -d '{"userId":"test-user","message":"Hello!"}'
   ```

3. **Update Test Client**
   - Edit `test-client.html`
   - Change `API_URL` to your deployment URL
   - Open in browser and test

## Monitoring

### Logs

**Render**: Dashboard → Logs tab
**Railway**: `railway logs`
**Vercel**: Dashboard → Deployments → View logs
**Docker**: `docker-compose logs -f`
**PM2**: `pm2 logs chatbot-agent`

### Metrics

- Monitor API response times
- Track MongoDB connections
- Watch memory usage
- Check Gemini API quota

## Troubleshooting

### Common Issues

1. **"Failed to connect to MongoDB"**
   - Check MONGODB_URI is correct
   - Verify network access in MongoDB Atlas
   - Ensure MongoDB service is running

2. **"Gemini API Error"**
   - Verify API key is correct
   - Check billing is enabled
   - Ensure quota is not exceeded

3. **"Port already in use"**
   - Change PORT in environment variables
   - Kill process on that port

4. **Build Fails**
   - Ensure Node.js 18+ is used
   - Check all dependencies in package.json
   - Run `npm install` locally first

## Performance Optimization

1. **Enable Compression**
   ```typescript
   import compression from 'compression';
   app.use(compression());
   ```

2. **Add Rate Limiting**
   ```typescript
   import rateLimit from 'express-rate-limit';
   app.use('/api/chat', rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   }));
   ```

3. **Cache Static Files**
   ```typescript
   app.use(express.static('public', { maxAge: '1d' }));
   ```

4. **Use CDN** for static assets

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation active
- [ ] MongoDB authentication enabled
- [ ] Regular backups configured

## Cost Estimates

### Free Tier Options:
- **Render**: Free for web services (with limitations)
- **MongoDB Atlas**: M0 free tier (512MB)
- **Gemini API**: Free tier with daily limits

### Paid Estimates (per month):
- **Render**: $7/month for basic
- **Railway**: ~$5/month with usage
- **DigitalOcean**: $5/month for droplet
- **AWS EC2**: ~$8/month for t2.micro
- **MongoDB Atlas**: $9/month for M10 (shared)
- **Gemini API**: Pay-per-use (~$0.0001 per message)

**Total**: $10-30/month for production deployment

## Next Steps

1. Deploy using your preferred option
2. Test all functionality
3. Configure custom domain (optional)
4. Set up monitoring
5. Create backup strategy
6. Document your deployment URL
7. Update video sample with live demo

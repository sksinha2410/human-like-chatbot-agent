#!/bin/bash

# Setup script for Human-Like Chatbot Agent
echo "🤖 Setting up Human-Like Chatbot Agent..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✓ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed"

# Build TypeScript
echo ""
echo "🔨 Building TypeScript..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✓ Build successful"

# Check for .env file
echo ""
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your GEMINI_API_KEY"
else
    echo "✓ .env file exists"
fi

# Check MongoDB
echo ""
echo "Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo "✓ MongoDB is installed"
else
    echo "⚠️  MongoDB not found. You can:"
    echo "   1. Install MongoDB locally: https://www.mongodb.com/docs/manual/installation/"
    echo "   2. Use Docker: docker run -d -p 27017:27017 --name mongodb mongo:6"
    echo "   3. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your GEMINI_API_KEY"
echo "2. Start MongoDB (if not already running)"
echo "3. Run: npm run dev"
echo "4. Open test-client.html in your browser"
echo ""
echo "For more information, see README.md"

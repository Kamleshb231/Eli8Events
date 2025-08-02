# E!i8Events - Event Management Website

A complete event management website with image galleries, inquiry form, and chatbot integration.

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Adding Images](#adding-images)
5. [Email Setup](#email-setup)
6. [Chatbot Integration](#chatbot-integration)
7. [Deployment Guide](#deployment-guide)
8. [Troubleshooting](#troubleshooting)

## Initial Setup

### Prerequisites
1. Install Node.js:
   - Download from [nodejs.org](https://nodejs.org/)
   - Click "LTS" version
   - Run the installer
   - Verify by opening Command Prompt/Terminal:
     ```sh
     node --version
     npm --version
     ```

2. Code Editor:
   - Download [Visual Studio Code](https://code.visualstudio.com/)
   - Install and open it

3. MongoDB Account:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create new cluster (choose FREE tier)
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://...`)

## Backend Setup

1. Open Terminal/Command Prompt in the project folder:
   ```sh
   cd backend
   npm install
   ```

2. Create `.env` file in `backend` folder:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_SERVICE=gmail
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASS=your_app_password
   ADMIN_EMAIL=where.to.receive@email.com
   PORT=5000
   ```

3. For Gmail setup:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Create new app password
   - Copy password to EMAIL_PASS in .env

4. Start backend:
   ```sh
   node index.js
   ```
   You should see: "Server running on port 5000"

## Frontend Setup

1. Open new Terminal/Command Prompt:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
   Website will open at: http://localhost:5173

## Adding Images

### Option 1: Static Images (Simplest)
1. Create folder: `frontend/public/images/`
2. Add three images named exactly:
   - `corporate.jpg`
   - `private.jpg`
   - `social.jpg`
3. Images will appear automatically in service cards

### Option 2: Dynamic Gallery (Advanced)
1. Using Postman or similar:
   - URL: `http://localhost:5000/api/gallery/upload`
   - Method: POST
   - Body type: form-data
   - Fields:
     - Key: `image` (type: File) → Select your image
     - Key: `service` (type: Text) → Enter: `corporate`, `private`, or `social`

2. View uploaded images:
   - List images: `http://localhost:5000/api/gallery/corporate`
   - View image: `http://localhost:5000/api/gallery/image/[image_id]`

## Email Setup

1. Gmail Account Setup:
   - Go to Gmail
   - Settings → See all settings → Forwarding and POP/IMAP
   - Enable IMAP
   - Save Changes

2. Create App Password:
   - Google Account → Security
   - 2-Step Verification → Turn on
   - App passwords → Generate
   - Copy password to .env file

3. Testing:
   - Fill out inquiry form on website
   - Check ADMIN_EMAIL inbox
   - Check spam folder if not received

## Chatbot Integration

1. Choose a provider:
   - [Tidio](https://www.tidio.com/) (recommended for beginners)
   - [Chatra](https://chatra.io/)
   - [Crisp](https://crisp.chat/)

2. Tidio Setup:
   - Sign up at Tidio
   - Go to Settings → Channel → Live Chat
   - Copy the script (looks like `<script src="//code.tidio.co/YOUR_CODE.js"></script>`)
   - Open `frontend/index.html`
   - Paste script just before `</body>` tag

## Deployment Guide

### Frontend (Netlify):
1. Create account at [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your repository
5. Deploy settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click Deploy

### Backend (Render):
1. Create account at [Render](https://render.com)
2. Click "New" → "Web Service"
3. Connect to GitHub
4. Select your repository
5. Settings:
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node index.js`
6. Add Environment Variables (from .env)
7. Click "Create Web Service"

## Troubleshooting

### Images not showing:
1. Check image names match exactly
2. Images must be in `frontend/public/images/`
3. Restart frontend server

### Emails not working:
1. Check spam folder
2. Verify app password is correct
3. Try different email service (Outlook/SendGrid)

### Backend errors:
1. Check MongoDB connection string
2. Verify .env file exists
3. All variables in .env are set
4. Restart backend server

### Frontend errors:
1. Check console (F12 in browser)
2. Verify backend is running
3. Backend URL is correct
4. Restart frontend server

## Need Help?

1. Check error messages in:
   - Browser console (F12)
   - Terminal running backend
   - Terminal running frontend

2. Common fixes:
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again
   - Restart both servers

3. File locations check:
   ```
   website/
   ├── frontend/
   │   ├── public/
   │   │   └── images/
   │   │       ├── corporate.jpg
   │   │       ├── private.jpg
   │   │       └── social.jpg
   │   ├── src/
   │   └── index.html
   └── backend/
       ├── .env
       └── index.js
   ```

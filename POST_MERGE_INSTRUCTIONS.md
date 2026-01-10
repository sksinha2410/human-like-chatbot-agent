# ⚠️ IMPORTANT: Manual Configuration Required After Merging

After this PR is merged to the `main` branch, you **MUST** configure GitHub Pages settings to use GitHub Actions as the deployment source.

## Steps to Complete the Setup:

### 1. Merge this PR to main branch

First, merge this pull request into the `main` branch.

### 2. Configure GitHub Pages Source

1. Go to your repository: https://github.com/sksinha2410/human-like-chatbot-agent
2. Click on **Settings** tab (at the top)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under **Build and deployment** → **Source**:
   - Select: **GitHub Actions**
   
   ![GitHub Pages Source Selection](https://docs.github.com/assets/cb-47267/mw-1440/images/help/pages/publishing-source-drop-down.webp)

### 3. Verify Deployment

1. After configuring the source, the GitHub Actions workflow will automatically run
2. Go to the **Actions** tab to monitor the deployment
3. Look for the "Deploy GitHub Pages" workflow
4. Once it shows a green checkmark (✅), your site is deployed!

### 4. Visit Your Site

Your GitHub Pages site will be available at:
```
https://sksinha2410.github.io/human-like-chatbot-agent/
```

### 5. Test the Chatbot Frontend

1. Visit the URL above
2. You should see the chatbot interface
3. Click the ⚙️ **Settings** button
4. Enter your backend API URL (or use localhost for development)
5. Start chatting!

## Troubleshooting

### Site shows 404 error

- **Cause**: GitHub Pages source not configured to GitHub Actions
- **Fix**: Follow Step 2 above to configure the source

### Workflow fails

- Check the Actions tab for error details
- Ensure the workflow has proper permissions (already configured in the workflow file)
- Try re-running the workflow from the Actions tab

### Site doesn't update after changes

- Wait 1-2 minutes for deployment to complete
- Check the Actions tab to see if the workflow completed successfully
- Try a hard refresh in your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache

## What This PR Does

- ✅ Adds automated GitHub Pages deployment via GitHub Actions
- ✅ Deploys the `/docs` folder automatically when code is merged to main
- ✅ Updates documentation with correct setup instructions
- ✅ Fixes the issue where gh-pages branch had empty docs folder

## Technical Details

The workflow (`.github/workflows/pages.yml`):
- Triggers on push to main branch
- Can also be manually triggered
- Uses official GitHub Actions for Pages deployment
- Deploys content from `./docs` directory
- Requires GitHub Pages source to be set to "GitHub Actions"

---

**Remember**: The site won't work until you complete Step 2 above! 🚀

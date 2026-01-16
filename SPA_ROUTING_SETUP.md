# SPA Routing Setup Guide

This guide explains how to handle Single Page Application (SPA) routing on different hosting platforms.

## Problem
When you directly access a route like `/blog/some-slug` or `/tools/image-to-pdf`, the server looks for that file/folder. Since it doesn't exist, you get a 404 error. We need to configure the server to serve `index.html` for all routes so React Router can handle client-side routing.

## Solution Files Created

### 1. Netlify (`public/_redirects`)
If you're using Netlify, this file is automatically used. It redirects all routes to `index.html`.

### 2. Vercel (`vercel.json`)
If you're using Vercel, this configuration file handles routing with rewrites.

### 3. Apache (`public/.htaccess`)
For Apache servers, this `.htaccess` file in the `public` folder handles routing.

### 4. Nginx (`nginx.conf`)
For Nginx servers, copy this configuration to your server's nginx config.

## Platform-Specific Instructions

### Netlify
- The `public/_redirects` file is automatically copied to the build output
- No additional configuration needed
- Deploy and test

### Vercel
- The `vercel.json` file in the root directory is automatically used
- No additional configuration needed
- Deploy and test

### Apache (cPanel, shared hosting)
- The `.htaccess` file in the `public` folder is automatically copied to the build output
- Make sure your hosting provider allows `.htaccess` files
- Some providers may require `mod_rewrite` to be enabled

### Nginx
1. Copy the contents of `nginx.conf` to your server configuration
2. Update the `root` path to match your deployment location
3. Update `server_name` with your domain
4. Reload nginx: `sudo nginx -s reload`

### GitHub Pages
GitHub Pages requires a different approach. You'll need to:
1. Use the `gh-pages` npm package
2. Configure `base` in `vite.config.ts`
3. Or use a custom 404.html that redirects to index.html

### Cloudflare Pages
- Add a `_redirects` file (same as Netlify) or
- Use Cloudflare's redirect rules in the dashboard

## Testing

After deploying, test these URLs:
- `https://yourdomain.com/blog/pomodoro-technique-science-focus`
- `https://yourdomain.com/tools/image-to-pdf`
- `https://yourdomain.com/about`

All should load correctly without 404 errors.

## Troubleshooting

1. **Still getting 404?**
   - Check that the redirect file is in the build output (`dist` folder)
   - Verify your hosting platform supports the redirect method
   - Check server logs for errors

2. **Apache not working?**
   - Ensure `mod_rewrite` is enabled
   - Check that `.htaccess` files are allowed
   - Verify file is copied to the build output

3. **Nginx not working?**
   - Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`
   - Verify configuration syntax: `sudo nginx -t`
   - Ensure the root path is correct

## Build Process

These files are automatically copied from `public/` to `dist/` during the build process because Vite copies all files from the public directory.


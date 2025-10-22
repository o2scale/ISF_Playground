# Nginx Configuration Fix - Detailed Analysis

## Problem Identified

When navigating to `/shop/admin/products`, nginx is incorrectly trying to load static assets from:
- `/shop/admin/static/js/main.8f52d128.js` ❌ (WRONG)

But the actual files are at:
- `/static/js/main.8f52d128.js` ✅ (CORRECT)

This happens because the `try_files` directive isn't properly configured or there's an issue with how nginx is handling the paths.

## Root Cause

Your current nginx config has:
```nginx
location / {
    try_files $uri $uri/ /index.html; # Handles React client-side routing
}
```

However, there's likely a missing configuration for the `/server/` proxy that's interfering, or the config needs to be more explicit about serving static files.

## Complete Fixed Configuration

Replace your entire nginx configuration with this:

```nginx
server {
    listen 443 ssl;
    server_name playground.initiativesewafoundation.com;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/playground.initiativesewafoundation.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/playground.initiativesewafoundation.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Root directory for React app
    root /var/www/playground;
    index index.html;

    # Serve static files directly (CSS, JS, images, etc.)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json)$ {
        root /var/www/playground;
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Proxy API requests to backend
    location /server/ {
        proxy_pass http://localhost:5001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve React app for all other routes (client-side routing)
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name playground.initiativesewafoundation.com;

    return 301 https://$server_name$request_uri;
}
```

## Key Changes Explained

1. **Static files location block** (lines 17-23):
   - Explicitly handles all static asset extensions
   - Forces nginx to look in `/var/www/playground` root
   - Returns 404 if file not found (instead of trying fallback)
   - Adds cache headers for performance

2. **Order matters**:
   - Static files block BEFORE the `/` location
   - API proxy BEFORE the `/` location
   - Catch-all `/` location LAST

3. **Removed incomplete line**:
   - Your original config had an incomplete line: `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` followed by `server {`
   - This was causing syntax issues

## Step-by-Step Fix

### 1. Backup current config
```bash
sudo cp /etc/nginx/sites-available/playground /etc/nginx/sites-available/playground.backup
```

### 2. Edit the config
```bash
sudo nano /etc/nginx/sites-available/playground
```

### 3. Replace entire contents with the configuration above

**Press:**
- `Ctrl+K` repeatedly to delete all lines
- Then paste the new configuration
- `Ctrl+X` to exit
- `Y` to save
- `Enter` to confirm

### 4. Test the configuration
```bash
sudo nginx -t
```

**Expected output:**
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 5. Reload nginx
```bash
sudo systemctl reload nginx
```

### 6. Verify nginx is running
```bash
sudo systemctl status nginx
```

Should show: `Active: active (running)`

### 7. Check nginx error logs if issues persist
```bash
sudo tail -f /var/log/nginx/error.log
```

## Testing After Fix

1. **Clear browser cache completely**
   - `Ctrl+Shift+Delete` (Windows/Linux)
   - `Cmd+Shift+Delete` (Mac)
   - Select "All time"
   - Check "Cached images and files"

2. **Test these URLs directly**:
   - ✅ `https://playground.initiativesewafoundation.com/shop`
   - ✅ `https://playground.initiativesewafoundation.com/shop/admin/products`
   - ✅ `https://playground.initiativesewafoundation.com/shop/admin/inventory`
   - ✅ `https://playground.initiativesewafoundation.com/shop/admin/analytics`

3. **Check browser console** (F12):
   - Should have NO 404 errors
   - Should have NO manifest errors
   - Should have NO "Unexpected token" errors

## Alternative: Simpler Configuration

If the above doesn't work, try this even simpler version:

```nginx
server {
    listen 443 ssl;
    server_name playground.initiativesewafoundation.com;

    ssl_certificate /etc/letsencrypt/live/playground.initiativesewafoundation.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/playground.initiativesewafoundation.com/privkey.pem;

    root /var/www/playground;
    index index.html;

    # API proxy
    location /server/ {
        proxy_pass http://localhost:5001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Everything else serves React app
    location / {
        try_files $uri /index.html;
    }
}

server {
    listen 80;
    server_name playground.initiativesewafoundation.com;
    return 301 https://$host$request_uri;
}
```

## Troubleshooting

### If nginx test fails:
```bash
sudo nginx -t
```
Will show you the exact line number with the error.

### If nginx won't reload:
```bash
sudo systemctl restart nginx
```

### If still getting 404s:
```bash
# Verify files are in the right place
ls -la /var/www/playground/

# Should show:
# - index.html
# - static/ directory
# - manifest.json
# - favicon.ico
```

### If static files missing:
```bash
# Re-copy the build
cd /home/ubuntu/workspace/ISF_Playground/frontend
sudo cp -r build/* /var/www/playground/
sudo chown -R www-data:www-data /var/www/playground/
sudo chmod -R 755 /var/www/playground/
```

## Expected Result

After applying this fix:
- ✅ All shop routes work
- ✅ Direct URL navigation works
- ✅ Browser refresh works on any route
- ✅ Static files load correctly from `/static/` path
- ✅ No manifest errors
- ✅ No "Unexpected token '<'" errors

---

**Created:** October 15, 2025 10:15 PM
**Issue:** React Router routes load blank page due to incorrect static file paths
**Solution:** Explicit nginx configuration for static files before catch-all location

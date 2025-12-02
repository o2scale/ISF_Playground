# Nginx Configuration Fix for React Router

## Issue
Admin routes like `/shop/admin/products` return blank pages with manifest errors because nginx is trying to serve physical files instead of letting React Router handle the routing.

## Root Cause
When you navigate to `/shop/admin/products`, nginx looks for a file at that path. Since it doesn't exist, it returns a 404 or serves the wrong file. React Router needs the `index.html` file to be served for ALL routes.

## Solution
Update the nginx configuration to always serve `index.html` for the React app routes.

---

## Step 1: Locate Nginx Configuration File

On your AWS console terminal, run:

```bash
ls -la /etc/nginx/sites-available/
```

Look for a file like `playground` or `default`. Common names:
- `/etc/nginx/sites-available/playground`
- `/etc/nginx/sites-available/default`
- `/etc/nginx/nginx.conf`

---

## Step 2: View Current Configuration

```bash
sudo cat /etc/nginx/sites-available/playground
```

Or if it's the default:

```bash
sudo cat /etc/nginx/sites-available/default
```

---

## Step 3: Edit the Configuration

```bash
sudo nano /etc/nginx/sites-available/playground
```

Or:

```bash
sudo nano /etc/nginx/sites-available/default
```

---

## Step 4: Add/Update the Location Block

Find the server block that serves your React app from `/var/www/playground/`.

**The configuration should look like this:**

```nginx
server {
    listen 80;
    listen [::]:80;

    # Or if using HTTPS:
    # listen 443 ssl;
    # listen [::]:443 ssl;

    server_name playground.initiativesewafoundation.com;

    # Root directory where React build is located
    root /var/www/playground;
    index index.html;

    # CRITICAL: This ensures React Router handles all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (if backend is on same server)
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Key line to add/verify:**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

This tells nginx:
1. First, try to serve the file if it exists (`$uri`)
2. Then, try to serve it as a directory (`$uri/`)
3. Finally, serve `index.html` (which loads React Router)

---

## Step 5: Test the Configuration

Before reloading, test that the syntax is correct:

```bash
sudo nginx -t
```

You should see:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

---

## Step 6: Reload Nginx

```bash
sudo systemctl reload nginx
```

Or if reload doesn't work:

```bash
sudo systemctl restart nginx
```

---

## Step 7: Verify the Fix

Check nginx status:

```bash
sudo systemctl status nginx
```

Should show: `Active: active (running)`

---

## Step 8: Test in Browser

1. **Hard refresh** the page: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Navigate to: `https://playground.initiativesewafoundation.com/shop/admin/products`
3. Should now load the Product Management page

---

## Troubleshooting

### If nginx test fails:
```bash
sudo nginx -t
```
Will show you the exact line with the error.

### If nginx won't start:
```bash
sudo journalctl -u nginx -n 50
```
Shows recent nginx logs.

### If page still blank after fix:
1. Clear browser cache completely
2. Try incognito/private mode
3. Check browser console for errors (F12)

### Check if files are in the right place:
```bash
ls -la /var/www/playground/
```

Should show:
- `index.html`
- `static/` directory
- `manifest.json`
- Other React build files

---

## Quick Command Sequence

If you just want the commands to copy-paste:

```bash
# 1. View current config
sudo cat /etc/nginx/sites-available/default

# 2. Edit config
sudo nano /etc/nginx/sites-available/default

# 3. Add this line inside the location / block:
#    try_files $uri $uri/ /index.html;

# 4. Test syntax
sudo nginx -t

# 5. Reload nginx
sudo systemctl reload nginx

# 6. Check status
sudo systemctl status nginx
```

---

## Complete Example Configuration

Here's a complete working example you can use as reference:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name playground.initiativesewafoundation.com;

    # Redirect HTTP to HTTPS (if using SSL)
    # return 301 https://$server_name$request_uri;

    root /var/www/playground;
    index index.html;

    # Serve React app - handles client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API backend proxy
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Expected Result

After this fix:
- ✅ `/shop` - Works
- ✅ `/shop/admin/products` - Works
- ✅ `/shop/admin/inventory` - Works
- ✅ `/shop/admin/analytics` - Works
- ✅ All other React Router routes - Work
- ✅ Direct URL navigation - Works
- ✅ Browser refresh on any route - Works

---

**Created:** October 15, 2025
**Issue:** React Router routes returning blank pages on production
**Solution:** Configure nginx to serve index.html for all routes

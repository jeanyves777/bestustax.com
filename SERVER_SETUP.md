# BestUSTax Server Setup

## Server Status: ✅ STABLE

### PM2 Process Manager

The Next.js development server is now managed by PM2, which provides:
- **Auto-restart on crashes**: Server will automatically restart if it fails
- **Auto-start on boot**: Server will start automatically when the system reboots
- **Memory management**: Auto-restart if memory usage exceeds 500MB
- **Exponential backoff**: Prevents rapid restart loops (100ms delay)
- **Logging**: All output is logged to files

---

## PM2 Commands

### Check Status
```bash
pm2 status
```

### View Logs
```bash
# Live logs
pm2 logs bestustax

# Last 50 lines
pm2 logs bestustax --lines 50

# Error logs only
pm2 logs bestustax --err
```

### Restart Server
```bash
pm2 restart bestustax
```

### Stop Server
```bash
pm2 stop bestustax
```

### Delete Process (removes from PM2)
```bash
pm2 delete bestustax
```

### Monitor Resources
```bash
pm2 monit
```

---

## Server Configuration

### Process Details
- **Name**: bestustax
- **Command**: `npm run dev`
- **Working Directory**: /var/bestustax
- **Mode**: fork
- **Max Memory**: 500MB (auto-restart if exceeded)
- **Restart Delay**: 100ms exponential backoff
- **Auto-start**: ✅ Enabled (systemd service)

### Log Files
- **Output**: `/root/.pm2/logs/bestustax-out.log`
- **Error**: `/root/.pm2/logs/bestustax-error.log`

---

## Nginx Configuration

### Reverse Proxy
- **Config File**: `/etc/nginx/sites-available/bestustax`
- **Port**: 80 (HTTP)
- **Proxy Target**: http://localhost:3000
- **Server Names**: bestustax.com, www.bestustax.com, 82.180.139.117

### Nginx Commands
```bash
# Test configuration
nginx -t

# Reload configuration
systemctl reload nginx

# Restart nginx
systemctl restart nginx

# Check status
systemctl status nginx
```

---

## Access URLs

### Current (HTTP)
- **Public IP**: http://82.180.139.117 ✅
- **Domain**: http://bestustax.com (requires DNS update)
- **Domain www**: http://www.bestustax.com (requires DNS update)

### Future (HTTPS) - After DNS is configured
- https://bestustax.com
- https://www.bestustax.com

---

## DNS Configuration Required

The domain **bestustax.com** currently points to:
- 92.112.198.243
- 148.135.128.145

**Update DNS A records to:**
- **A Record**: 82.180.139.117
- **AAAA Record**: 2a02:4780:10:6b8f::1

---

## SSL Certificate Setup (After DNS Update)

Once DNS is updated and pointing to this server:

```bash
# Install SSL certificate with Let's Encrypt
certbot --nginx -d bestustax.com -d www.bestustax.com

# Test auto-renewal
certbot renew --dry-run
```

Certbot is already installed and will automatically:
- Configure SSL in nginx
- Set up HTTP to HTTPS redirect
- Enable auto-renewal via systemd timer

---

## Troubleshooting

### Server Not Responding (502 Bad Gateway)

**Check PM2 status:**
```bash
pm2 status
```

**If status is "errored" or "stopped":**
```bash
pm2 restart bestustax
pm2 logs bestustax --lines 50
```

**If process is missing:**
```bash
cd /var/bestustax
pm2 start npm --name "bestustax" -- run dev
pm2 save
```

### High Memory Usage

PM2 will automatically restart if memory exceeds 500MB. To change this:
```bash
pm2 restart bestustax --max-memory-restart 1G
pm2 save
```

### Server Keeps Crashing

**Check error logs:**
```bash
pm2 logs bestustax --err --lines 100
```

**Common issues:**
1. Port 3000 already in use
   - `lsof -i :3000` to find process
   - `kill -9 <PID>` to kill it

2. Out of memory
   - Increase max memory restart limit
   - Check for memory leaks

3. Compilation errors
   - Check error logs
   - Fix code errors
   - Restart: `pm2 restart bestustax`

### Nginx Issues

**502 Bad Gateway:**
- PM2 process is not running
- Port 3000 is not accessible
- Check: `curl http://localhost:3000`

**404 Not Found:**
- Nginx config might be wrong
- Check: `nginx -t`
- Reload: `systemctl reload nginx`

---

## Monitoring

### Real-time Monitoring
```bash
# PM2 built-in monitor
pm2 monit

# Process list with resources
watch -n 1 pm2 status

# Follow logs live
pm2 logs bestustax
```

### Server Resources
```bash
# CPU and memory
htop

# Disk usage
df -h

# Network connections
netstat -tulpn | grep :3000
```

---

## Startup/Reboot Behavior

✅ **PM2 is configured to start on boot**

The systemd service `pm2-root.service` will:
1. Start automatically when server boots
2. Launch all saved PM2 processes
3. Restart PM2 if it crashes

**Service commands:**
```bash
# Check PM2 service status
systemctl status pm2-root

# Manually start/stop PM2 service
systemctl start pm2-root
systemctl stop pm2-root

# Disable auto-start (not recommended)
systemctl disable pm2-root
```

---

## Performance Optimization

### Current Settings
- Development mode (not production optimized)
- No caching enabled
- Full source maps
- Hot Module Replacement (HMR) enabled

### For Production
Switch to production build:
```bash
# Stop dev server
pm2 delete bestustax

# Build for production
cd /var/bestustax
npm run build

# Start production server
pm2 start npm --name "bestustax" -- start
pm2 save
```

---

## Backup & Recovery

### PM2 Process List
- Saved to: `/root/.pm2/dump.pm2`
- Auto-saves on changes (autodump enabled)

### Manual Save
```bash
pm2 save
```

### Restore Processes
```bash
pm2 resurrect
```

---

## Summary

✅ **PM2 installed and configured**
✅ **Auto-restart on crash enabled**
✅ **Auto-start on boot enabled**
✅ **Max memory limit: 500MB**
✅ **Exponential backoff on restart**
✅ **Logs being captured**
✅ **Server responding on port 3000**
✅ **Nginx proxying to Next.js**
✅ **Public access working: http://82.180.139.117**

**Next Steps:**
1. Update DNS to point to 82.180.139.117
2. Install SSL certificate with certbot
3. Test HTTPS access
4. Consider switching to production build

---

## Color Scheme (Recently Updated)

- **Gold**: #D4AF37
- **Dark Blue**: #1E3A5F
- **White**: #FFFFFF

**Logo Colors:**
- Light mode: Dark Blue logo
- Dark mode: Gold logo

See [COLOR_SCHEME_UPDATED.md](COLOR_SCHEME_UPDATED.md) for full details.

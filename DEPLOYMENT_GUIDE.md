# BestUSTax - Deployment Guide

## Production Deployment Checklist

### Pre-Deployment

- [ ] All environment variables configured
- [ ] Build test successful (`npm run build`)
- [ ] TypeScript errors resolved (`npm run type-check`)
- [ ] ESLint warnings addressed (`npm run lint`)
- [ ] Images optimized and added to `/public`
- [ ] Metadata updated with real URLs
- [ ] Analytics tracking IDs added
- [ ] Google verification codes added

### Environment Variables

Create `.env.production` with:

```env
# Required
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_NAME=BestUSTax

# Analytics (Optional but Recommended)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# CMS (If using)
NEXT_PUBLIC_CMS_URL=
CMS_API_TOKEN=

# Database (If using)
DATABASE_URL=postgresql://...

# Authentication (If implementing client portal)
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://yourdomain.com

# Payment (If implementing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email Service (If implementing)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASSWORD=your-password
EMAIL_FROM=noreply@yourdomain.com
```

---

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

#### Why Vercel?
- Built by Next.js creators
- Zero configuration
- Automatic deployments
- Edge network
- Free SSL
- Free tier available

#### Steps:

1. **Push to Git**
```bash
cd /var/bestustax
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js
   - Add environment variables
   - Click "Deploy"

3. **Custom Domain**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed
   - SSL certificate auto-generated

**Done!** Your site is live with automatic deployments on every push.

---

### Option 2: Netlify

1. **Build Configuration**

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. **Deploy**
   - Connect GitHub repo to Netlify
   - Configure build settings
   - Add environment variables
   - Deploy

---

### Option 3: AWS (Advanced)

#### Using AWS Amplify

1. **Install Amplify CLI**
```bash
npm install -g @aws-amplify/cli
amplify configure
```

2. **Initialize**
```bash
amplify init
amplify add hosting
amplify publish
```

#### Using EC2 + PM2

1. **Build Application**
```bash
npm run build
```

2. **Server Setup**
```bash
# On EC2 instance
npm install pm2 -g
pm2 start npm --name "bestustax" -- start
pm2 save
pm2 startup
```

3. **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

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

---

### Option 4: Docker

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

2. **Build & Run**
```bash
docker build -t bestustax .
docker run -p 3000:3000 bestustax
```

3. **Docker Compose**
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

---

### Option 5: Traditional VPS (DigitalOcean, Linode, etc.)

1. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Clone & Build**
```bash
git clone YOUR_REPO_URL /var/www/bestustax
cd /var/www/bestustax
npm install
npm run build
```

3. **PM2 Process Manager**
```bash
npm install -g pm2
pm2 start npm --name "bestustax" -- start
pm2 startup
pm2 save
```

4. **Nginx Reverse Proxy**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/bestustax
```

```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

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

5. **SSL Certificate**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Post-Deployment

### 1. Performance Monitoring

**Google PageSpeed Insights**
- Test: https://pagespeed.web.dev/
- Target: 90+ score

**Lighthouse**
```bash
npm install -g lighthouse
lighthouse https://yourdomain.com --view
```

### 2. Analytics Setup

**Google Analytics 4**
1. Create GA4 property
2. Add measurement ID to `.env`
3. Verify tracking

**Google Tag Manager**
1. Create container
2. Add GTM ID to `.env`
3. Configure tags

### 3. SEO Verification

**Google Search Console**
1. Add property
2. Verify ownership
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

**Bing Webmaster Tools**
1. Add site
2. Verify
3. Submit sitemap

### 4. Security Headers

Add to `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
        }
      ]
    }
  ]
}
```

### 5. Sitemap Generation

Install next-sitemap:
```bash
npm install next-sitemap
```

Create `next-sitemap.config.js`:
```javascript
module.exports = {
  siteUrl: 'https://yourdomain.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
}
```

Add to `package.json`:
```json
"scripts": {
  "postbuild": "next-sitemap"
}
```

### 6. Error Monitoring

**Sentry Setup**
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### 7. CDN Setup (Optional)

**Cloudflare**
1. Add site to Cloudflare
2. Update nameservers
3. Enable caching rules
4. Configure page rules

---

## Performance Checklist

- [ ] Images in WebP/AVIF format
- [ ] Fonts optimized with next/font
- [ ] Code splitting implemented
- [ ] Lazy loading for components
- [ ] Caching headers configured
- [ ] Compression enabled (gzip/brotli)
- [ ] CDN configured
- [ ] Database queries optimized (if applicable)

---

## SEO Checklist

- [ ] Sitemap.xml generated and submitted
- [ ] Robots.txt configured
- [ ] Meta tags optimized
- [ ] OpenGraph images created
- [ ] Schema markup added
- [ ] 404 page created
- [ ] Redirects configured
- [ ] Canonical URLs set
- [ ] Mobile-friendly verified

---

## Security Checklist

- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Dependencies updated
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Rate limiting (if applicable)
- [ ] Input validation
- [ ] Authentication secured (if applicable)

---

## Monitoring & Maintenance

### Weekly Tasks
- Check error logs
- Review analytics
- Monitor performance metrics
- Check uptime

### Monthly Tasks
- Update dependencies
- Review security advisories
- Analyze user behavior
- Optimize based on data

### Quarterly Tasks
- Major feature updates
- SEO audit
- Performance optimization
- Content refresh

---

## Rollback Plan

### Vercel
```bash
vercel rollback
```

### Git
```bash
git revert HEAD
git push origin main
```

### PM2
```bash
pm2 list
pm2 delete bestustax
git checkout previous-commit
npm install
npm run build
pm2 start npm --name "bestustax" -- start
```

---

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Deployment Guide**: https://nextjs.org/docs/deployment

---

**Deployment Status**: Ready for production deployment ✅

Choose your preferred deployment method and follow the steps above. Vercel is recommended for the easiest and fastest deployment.

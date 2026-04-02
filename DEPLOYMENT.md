# TubeKit Deployment Guide

## Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
cd tubekit
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

## Production Deployment

### Option 1: Vercel (Easiest - Recommended)

**Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

**Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_SITE_NAME=TubeKit
   YOUTUBE_API_KEY=your_api_key
   ```
6. Click "Deploy"

**Your site will be live in 2-3 minutes!**

Custom Domain:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Option 2: Netlify

**Step 1: Build Settings**
- Build command: `npm run build`
- Publish directory: `.next`
- Functions directory: Leave empty

**Step 2: Deploy**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Option 3: Railway

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables
6. Deploy automatically happens

### Option 4: DigitalOcean App Platform

1. Connect GitHub repository
2. Configure:
   - Type: Web Service
   - Build Command: `npm run build`
   - Run Command: `npm run start`
3. Add environment variables
4. Deploy

### Option 5: Self-Hosted (VPS)

**Requirements:**
- Ubuntu 20.04+ or similar
- Node.js 18+
- Nginx (recommended)
- PM2 for process management

**Setup:**

```bash
# 1. Clone repository
git clone your-repo-url
cd tubekit

# 2. Install dependencies
npm install

# 3. Build
npm run build

# 4. Install PM2
npm install -g pm2

# 5. Start with PM2
pm2 start npm --name "tubekit" -- start

# 6. Configure Nginx
sudo nano /etc/nginx/sites-available/tubekit
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
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

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/tubekit /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Environment Variables

### Required
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=TubeKit
```

### Optional (Recommended)
```env
# YouTube API - Get from Google Cloud Console
YOUTUBE_API_KEY=AIzaSy...

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form
CONTACT_EMAIL=support@yourdomain.com
```

## Post-Deployment Checklist

### SEO Setup
- [ ] Verify sitemap at `/sitemap.xml`
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Add to Google Analytics
- [ ] Verify robots.txt
- [ ] Test mobile responsiveness
- [ ] Check Core Web Vitals in PageSpeed Insights

### DNS Configuration
```
A Record: @ → Your-Server-IP
A Record: www → Your-Server-IP
```

### SSL Certificate
- Automatically handled by Vercel/Netlify
- For self-hosted: Use Let's Encrypt (see above)

### Testing
```bash
# Test production build locally
npm run build
npm run start
```

Visit `http://localhost:3000` and test all features

## Performance Optimization

### CDN Setup (Optional)
Use Cloudflare for:
- Global CDN
- DDoS protection
- Free SSL
- Caching

**Steps:**
1. Sign up at cloudflare.com
2. Add your domain
3. Update nameservers at your registrar
4. Enable orange cloud for all records

### Image Optimization
Next.js automatically optimizes images. No additional setup needed!

### Caching
Next.js has built-in caching. For custom caching:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## Monitoring

### Error Tracking - Sentry (Recommended)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- StatusCake

### Analytics
- Google Analytics
- Plausible (privacy-focused)
- Fathom Analytics

## Scaling

### For High Traffic:

1. **Use CDN**: Cloudflare or AWS CloudFront
2. **Database**: Add Redis for caching
3. **Load Balancer**: For multiple servers
4. **Serverless**: Deploy to Vercel Edge Functions

### Cost Optimization

**Vercel Free Tier:**
- 100 GB bandwidth
- Unlimited serverless executions
- Perfect for starting out

**Upgrade triggers:**
- >100GB monthly bandwidth
- Need commercial license
- Custom SLA

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Slow Performance
1. Check Core Web Vitals
2. Optimize images
3. Enable caching
4. Use CDN
5. Minimize API calls

### API Rate Limits
Implement rate limiting:
```bash
npm install express-rate-limit
```

## Backup Strategy

### Automated Backups
```bash
# Backup script
#!/bin/bash
DATE=$(date +%Y-%m-%d)
tar -czf backup-$DATE.tar.gz /path/to/tubekit
# Upload to S3 or similar
```

### Database Backups
If you add a database later, automate daily backups

## Updates & Maintenance

### Update Dependencies
```bash
npm update
npm audit fix
```

### Next.js Updates
```bash
npm install next@latest react@latest react-dom@latest
```

## Legal Compliance

Before going live:
- [ ] Review Privacy Policy
- [ ] Review Terms of Service
- [ ] Add GDPR compliance if needed
- [ ] Add cookie consent if using analytics
- [ ] Ensure copyright compliance

## Launch Day Checklist

24 Hours Before:
- [ ] Final testing on staging
- [ ] Verify all links work
- [ ] Test contact form
- [ ] Check mobile experience
- [ ] Run Lighthouse audit
- [ ] Verify SEO meta tags

Launch Day:
- [ ] Deploy to production
- [ ] Monitor error logs
- [ ] Test all features live
- [ ] Submit sitemap to search engines
- [ ] Announce on social media
- [ ] Monitor analytics

## Support

Need help? Check:
- Next.js documentation: nextjs.org/docs
- Vercel documentation: vercel.com/docs
- Community forums
- GitHub issues

---

**You're ready to launch! 🚀**

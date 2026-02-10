# HireOS Prototype — Deployment Guide

## Option 1: Netlify (Recommended — Drag & Drop)
1. Go to https://app.netlify.com/drop
2. Drag the `dist` folder onto the page
3. Your site will be live in seconds!

## Option 2: Netlify CLI
```bash
npm install -g netlify-cli
cd dist
netlify deploy --dir=. --prod
```

## Option 3: Vercel
```bash
npm install -g vercel
cd dist
vercel --prod
```

## Option 4: Single HTML File
The bundled `hireos-prototype.html` file works standalone — just open it in any browser or upload it to any static host.

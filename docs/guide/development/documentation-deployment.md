---
title: Documentation Deployment
outline: deep
---

# Documentation Deployment

This guide covers how to deploy the Micro Core UI documentation to Firebase Hosting.

## Prerequisites

- Node.js and npm installed
- A Firebase account
- Firebase CLI installed globally

## Installation

Install the Firebase CLI globally:

```bash
npm install -g firebase-cli
```

## Authentication

Login to your Firebase account:

```bash
firebase login
```

## Deploy

Deploy the documentation to Firebase Hosting:

```bash
npm run docs:deploy
```

This command will:
1. Build the documentation site (generates static files in `dist-docs` folder)
2. Deploy to Firebase Hosting

Your site will be live at `https://your-project-id.web.app` or `https://your-project-id.firebaseapp.com`.

## Manual Build (Optional)

If you need to build without deploying:

```bash
npm run docs:build
```

## Preview Deployment

To preview your deployment before going live:

```bash
firebase hosting:channel:deploy preview
```

## Configuration

The Firebase configuration is located in `firebase.json` at the root of the project:

```json
{
  "hosting": {
    "public": "dist-docs",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

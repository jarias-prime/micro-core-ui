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

## Build

Build the documentation site:

```bash
npm run docs:build
```

This will generate the static files in the `dist-docs` folder at the root of the project.

**Note:** The `dist-docs` folder must exist before deploying. If it doesn't exist, run the build command above to generate it.

## Deploy

Deploy to Firebase Hosting:

```bash
firebase deploy
```

Your site will be live at `https://your-project-id.web.app` or `https://your-project-id.firebaseapp.com`.

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

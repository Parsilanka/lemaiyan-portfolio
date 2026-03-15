# Portfolio Technical Documentation
**Author:** Samuel Lemaiyan (Parsilanka)  
**Date:** March 15, 2026  
**License:** Custom  

---

## 1. Executive Summary
This document provides a comprehensive technical overview of the Professional Full-Stack Portfolio. The application is a high-performance web platform built with Next.js 15, integrated with MongoDB Atlas for dynamic content management, and deployed on Vercel.

## 2. Technical Architecture
The system follows a modern serverless architecture:

- **Frontend**: Single Page Application (SPA) feel with Next.js App Router.
- **Backend**: Serverless API routes (`/api/*`) handling database interactions.
- **Database**: Document-based storage using MongoDB.
- **Styling**: Utility-first CSS using Tailwind.
- **State Management**: React Hooks and state for form handling and data fetching.

## 3. Core Components

### 3.1 Database Layer (`/src/lib/mongodb.ts`)
The database connection is managed via Mongoose. It features a singleton pattern to prevent multiple connections in serverless environments.
- **Database Name**: `portfolio`
- **Driver**: Mongoose

### 3.2 Data Models (`/src/lib/models`)
- **Project**: Stores title, description, tech stack, GitHub/Live links, and image paths.
- **Experience**: Stores role, company, dates, and responsibilities.
- **Contact**: Stores user inquiries (Name, Email, Message, Timestamp).

### 3.3 Frontend Components (`/src/components`)
- **Hero**: Dynamic introduction with premium typography.
- **Projects**: Client-side data fetching with robust error handling for API failures.
- **Experience**: Timeline-based professional history.
- **Contact**: Secure form with real-time status feedback (Success/Error).

## 4. API Documentation

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/projects` | GET | Fetches all projects from MongoDB. |
| `/api/experience` | GET | Fetches all work experiences from MongoDB. |
| `/api/contact` | POST | Submits a new contact form message to the database. |

## 5. Deployment & DevOps

### 5.1 Vercel Configuration
The project is configured via `vercel.json` to handle peer dependency conflicts:
```json
{
  "installCommand": "npm install --legacy-peer-deps"
}
```

### 5.2 Environment Variables
- `MONGODB_URI`: The primary connection string for the cloud database.

## 6. Maintenance & Updates
To update content on the live site:
1. Open **MongoDB Atlas**.
2. Update documents in the `projects` or `experience` collections.
3. Assets (images) should be placed in the `/public/images` directory and referenced in the database.

---
*End of Documentation*

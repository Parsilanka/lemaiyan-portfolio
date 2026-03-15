# 🚀 Professional Full-Stack Portfolio

A premium, state-of-the-art developer portfolio built with **Next.js 15**, **Tailwind CSS**, and **MongoDB**. This project features a completely dynamic backend, enabling real-time updates to projects, experience, and contact messages without needing to redeploy code.

---

## 🔗 Live Demo
**View the live site here:** [https://lemaiyan-portfolio.vercel.app](https://lemaiyan-portfolio.vercel.app)

---

## ✨ Features
- **Dynamic Content**: Projects and Work Experience are fetched directly from MongoDB Atlas.
- **Automated Contacts**: A fully functional contact form that saves messages to your cloud database.
- **Micro-Animations**: Powered by `Framer Motion` for a premium, interactive user experience.
- **Modern UI**: Dark-mode first design with a sleek, minimalist aesthetic.
- **Full-Stack Architecture**: Next.js API routes handling all CRUD operations.

---

## 🛠️ Tech Stack
- **Frontend**: [Next.js 15+](https://nextjs.org/), React 19, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud)
- **Styling**: Tailwind CSS & Lucide Icons
- **Animations**: Framer Motion

---

## ⚙️ Environment Variables

To run this project locally or in production, you must set the following environment variables:

| Variable | Description |
| :--- | :--- |
| `MONGODB_URI` | Your MongoDB Atlas connection string (with password) |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Parsilanka/lemaiyan-portfolio.git
cd lemaiyan-portfolio
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run development server
```bash
npm run dev
```
The site will be available at [http://localhost:3000](http://localhost:3000).

---

## 📊 Database Management

This project uses a database named `portfolio`. To add new content, log in to your **MongoDB Atlas** dashboard and update the following collections:

### `projects` Collection
```json
{
  "title": "Project Name",
  "description": "Short summary...",
  "techStack": ["Next.js", "AI"],
  "githubUrl": "https://github.com...",
  "imageUrl": "/images/your-image.png",
  "featured": true
}
```

### `experience` Collection
```json
{
  "role": "Software Engineer",
  "company": "Company Name",
  "startDate": "Jan 2024",
  "endDate": "Present",
  "responsibilities": ["Lead dev...", "Built X..."],
  "order": 1
}
```

---

## 📤 Deployment

This project is optimized for deployment on **Vercel**:

1. Push your code to GitHub.
2. Connect your GitHub repository to [Vercel](https://vercel.com/).
3. Add the `MONGODB_URI` environment variable in the Vercel dashboard.
4. Deployment will happen automatically on every push to the `main` branch.

---

## 📄 License
Custom Portfolio License. Developed by [Parsilanka](https://github.com/Parsilanka).

# 🎥 YouTube Video Manager Dashboard

A mini dashboard application that connects to the YouTube API and helps creators manage **one of their uploaded videos** in detail. The app supports video metadata editing, comment interaction, personal note-taking, and event logging.

---

## 🚀 Features

- ✅ **Video Details Display**
  - Fetch and display video details (title, description, thumbnail, etc.) using the YouTube Data API.
- 📝 **Edit Video Metadata**

  - Update the video’s **title** and **description** directly from the dashboard.

- 💬 **Comments Section**

  - View all comments on the video.
  - Add new comments and reply to existing ones.
  - Delete your own comments.

- 🗒️ **Notes Section**

  - Take personal notes about the video.
  - Add tags and search through notes easily.
  - Notes are stored in your app's own backend database.

- 📊 **Event Logging**
  - All major user actions (like editing video, commenting, or note-taking) are logged and saved in the database for tracking.

---

## 🧩 Tech Stack

### Frontend

- React.js + Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)

### APIs & Libraries

- YouTube Data API v3
- Google OAuth 2.0 (for authenticating YouTube account)
- dotenv, cors, cookie-parser (for backend utilities)

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/youtube-video-manager.git
cd youtube-video-manager
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a .env file in the backend directory with the following:

PORT=5000

MONGO_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

REDIRECT_URI=http://localhost:5000/api/auth/google/callback

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:3000

NODE_ENV=development

Then start the backend server:

```bash
npm run dev
```

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
```

Create a .env file in the frontend directory with the following:

VITE_SERVER_URL=http://localhost:5000

Then start the frontend:

```bash
npm run dev
```

---

## 🌐 API Endpoints

### 🔐 Auth Routes (`/api/auth`)

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| GET    | `/google`          | Redirect to Google OAuth  |
| GET    | `/google/callback` | OAuth callback handler    |
| GET    | `/check`           | Check user authentication |
| GET    | `/logout`          | Logout and revoke session |

---

### 🎬 Video Routes (`/api/video`)

| Method | Endpoint                              | Description                        |
| ------ | ------------------------------------- | ---------------------------------- |
| GET    | `/:videoId`                           | Get video details                  |
| PUT    | `/:videoId`                           | Update video title and description |
| GET    | `/:videoId/comments`                  | Fetch video comments               |
| POST   | `/:videoId/comments`                  | Add new comment                    |
| POST   | `/:videoId/comments/:commentId/reply` | Reply to a comment                 |
| DELETE | `/comments/:commentId`                | Delete a comment                   |

---

### 🗒️ Notes Routes (`/api/notes`)

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/`              | Create a new note           |
| GET    | `/:videoId`      | Get all notes for a video   |
| GET    | `/search/:query` | Search notes by keyword/tag |

---

### 📋 Logs Route (`/api/logs`)

| Method | Endpoint | Description              |
| ------ | -------- | ------------------------ |
| GET    | `/`      | Get all user action logs |

---

## 🧬 MongoDB Schemas

### User Schema

```js
{
  googleId: String,       // Google account ID
  email: String,          // User email
  name: String,           // Full name
  accessToken: String,    // YouTube API token
  refreshToken: String,   // OAuth refresh token
  createdAt: Date,
  updatedAt: Date
}
```

### Video Schema

```js
{
  videoId: String,       // YouTube video ID
  content: String,       // Note content
  tags: [String],        // Optional tags
  createdAt: Date
}
```

### Notes Schema

```js
{
  videoId: String,       // YouTube video ID
  content: String,       // Note content
  tags: [String],        // Optional tags
  createdAt: Date
}
```

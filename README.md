# CodeRn

CodeRn is a modern full-stack online code editor and developer platform built using the MERN stack, Monaco Editor, Firebase Authentication, and Tailwind CSS.

Users can write code, authenticate using Google/GitHub/email login, and access a responsive coding workspace directly in the browser.

---

## Features

### Authentication
- Email & Password Authentication
- Google Login (Firebase)
- GitHub Login (Firebase)
- Persistent user sessions
- Logout functionality

### Code Editor
- Monaco Editor integration
- Syntax highlighting
- Real-time code editing
- Responsive editor layout
- Dark themed UI

### Frontend
- Modern animated UI
- Responsive design
- Custom navbar & footer
- Mobile-friendly layouts
- Smooth transitions & interactions

### Backend
- Node.js + Express API
- MongoDB database integration
- User authentication APIs
- Google/GitHub user storage
- REST API architecture

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Monaco Editor
- Firebase Authentication
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JWT (optional)

---

## Folder Structure

```bash
CodeRn/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/CodeRn.git
cd CodeRn
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` inside frontend:

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create `.env` inside backend:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

## Firebase Setup

Enable:
- Google Authentication
- GitHub Authentication

Inside Firebase Console:
- Add authorized domain
- Configure OAuth providers

---

## Environment Variables

### Frontend

```env
VITE_API_URL=
```

### Backend

```env
PORT=
MONGODB_URI=
JWT_SECRET=
```

---

## Authentication Flow

1. User logs in using:
   - Email/password
   - Google
   - GitHub

2. Firebase authenticates OAuth users

3. Backend stores user data in MongoDB

4. User session stored in localStorage

---

## Future Improvements

- Multi-language execution
- Judge0 API integration
- Real-time collaboration
- Code sharing links
- User profiles
- Saved snippets
- Themes & customization
- Docker deployment
- Admin dashboard

---

## Screenshots

Add project screenshots here.

---

## Deployment

Frontend:
- Vercel / Netlify

Backend:
- Render / Railway

Database:
- MongoDB Atlas

---

## Author

Prasanth Reddy

---

## License

MIT License
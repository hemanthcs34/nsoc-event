# TechSymphony - Restore Neurovia 🌐

A full-stack event management system for IEEE TechSymphony's technical competition. This project consists of an interactive multi-round competition platform where teams compete to restore the fictional city of Neurovia through various technical challenges.

## 🎯 Project Overview

TechSymphony is divided into three exciting rounds:

1. **Component Quest (Round 1)** 🎯
   - Interactive quiz system
   - Virtual component store with purchase validation
   - Real-time scoring and inventory management

2. **System Genesis (Round 2)** ⚡
   - Drag-and-drop schematic builder
   - Real-time circuit validation
   - Automated scoring system

3. **Neural Logic (Round 3)** 🧠
   - Integration with Unstop platform
   - Manual result submission
   - Admin verification system

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB (Database)
- JWT Authentication
- REST API

### Frontend
- React (Vite)
- React Router DOM
- Framer Motion
- TypeWriter Effects

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aashishvatwani/IEEE-EVENT.git
   cd IEEE-EVENT
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env    # Configure your environment variables
   npm run seed           # Seed initial data
   npm run dev           # Start development server
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/vite-project
   npm install
   npm run dev           # Start Vite development server
   ```

## 🌟 Features

### Team Management
- Team registration (3-4 members)
- Automatic sector assignment
- Team progress tracking

### Admin Dashboard
- Complete event oversight
- Real-time leaderboard
- Round-wise statistics
- Manual result verification

### Round-specific Features
- Interactive quiz system
- Component marketplace
- Circuit builder interface
- Integration with external platforms

## 🔐 Environment Variables

### Backend (.env)
```env
MONGO_URI=your_mongodb_uri
NODE_ENV=development
PORT=5000
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 📁 Project Structure

```
├── backend/                # Node.js & Express backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── scripts/          # Utility scripts
│
├── frontend/             # React frontend (Vite)
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── utils/        # Utility functions
    │   └── styles/       # CSS styles
    └── public/          # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Aashish Vatwani - Project Lead & Full Stack Developer
- [Add other team members]

## 🙏 Acknowledgments

- IEEE Student Branch
- Project Mentors
- All Contributors

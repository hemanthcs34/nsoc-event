# TechSymphony - Restore Neurovia Backend API

Backend API for the IEEE TechSymphony event management system built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Team Registration**: Register teams with 3-4 members, automatic sector assignment
- **Round 1 (Component Quest)**: Quiz system, component store with purchase validation
- **Round 2 (System Genesis)**: Schematic builder with drag-drop validation and scoring
- **Round 3 (Neural Logic)**: Unstop integration, manual result submission, admin verification
- **Admin Dashboard**: Complete event management, leaderboard, statistics
- **Real-time Scoring**: Automatic score calculation for all rounds
- **Authentication**: JWT-based admin authentication

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure:
   ```env
   MONGODB_URI=mongodb://localhost:27017/techsymphony
   JWT_SECRET=your_secure_secret_key
   PORT=5000
   ```

4. **Start MongoDB**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```
   This creates:
   - 12 IoT components
   - 12 quiz questions
   - Admin user (username: `admin`, password: `admin123`)

6. **Start the server**
   ```bash
   # Development (with auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

Server will start at `http://localhost:5000`

## 📡 API Endpoints

### Teams
- `POST /api/teams/register` - Register a new team
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `GET /api/teams/name/:teamName` - Get team by name

### Round 1 (Component Quest)
- `GET /api/round1/quiz` - Get quiz questions
- `POST /api/round1/quiz/submit` - Submit quiz answers
- `GET /api/round1/components` - Get available components
- `POST /api/round1/purchase` - Purchase components
- `GET /api/round1/team/:teamId` - Get Round 1 data

### Round 2 (System Genesis)
- `POST /api/round2/submit` - Submit schematic
- `GET /api/round2/team/:teamId` - Get Round 2 data
- `GET /api/round2/correct-flow` - Get correct schematic flow

### Round 3 (Neural Logic)
- `GET /api/round3/challenge/:teamId` - Get Unstop challenge link
- `POST /api/round3/submit` - Submit Round 3 results
- `GET /api/round3/team/:teamId` - Get Round 3 data
- `PUT /api/round3/verify/:teamId` - Verify Round 3 (Admin only)

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/teams` - Get all teams (Admin)
- `GET /api/admin/leaderboard` - Get leaderboard (Admin)
- `GET /api/admin/stats` - Get event statistics (Admin)
- `PUT /api/admin/round3/time/:teamId` - Update Round 3 time (Admin)
- `DELETE /api/admin/teams/:teamId` - Delete team (Super Admin)

## 🔐 Authentication

Admin routes require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

To get token, login with:
```bash
POST /api/admin/login
{
  "username": "admin",
  "password": "admin123"
}
```

## 📊 Database Schema

### Team
- Team name, members (3-4), sector assignment
- Round 1: Quiz score, purchased components, balance
- Round 2: Schematic, correct placements, time, penalties
- Round 3: Test cases, time, admin verification
- Total score (auto-calculated)

### Component
- Name, type, icon, description, price
- Specifications, availability, category

### QuizQuestion
- Question, options, correct answer
- Category, difficulty, points

### Admin
- Username, password (hashed), email
- Role (super_admin, admin, moderator)
- Last login tracking

## 🎯 Scoring System

### Round 1: Component Quest
- Quiz: 100 points per correct answer
- Final Score = Remaining balance after purchases

### Round 2: System Genesis
- Formula: `(correctPlacements × 5) + (20 - timeTaken) - penalties`
- Penalties: 2 points per wrong placement

### Round 3: Neural Logic
- Formula: `testCasesPassed + (25 - timeTaken)`
- Test cases: 0-10 points
- Time bonus: Max 25 points

### Total Score
- Sum of all three rounds

## 🧪 Testing

Test endpoints using Postman or curl:

```bash
# Register a team
curl -X POST http://localhost:5000/api/teams/register \
  -H "Content-Type: application/json" \
  -d '{
    "teamName": "NeuralExplorers",
    "members": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "9876543210",
        "isIEEEMember": true,
        "ieeeId": "IEEE123"
      }
    ]
  }'

# Get all components
curl http://localhost:5000/api/round1/components

# Admin login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

## 🔧 Development

### Project Structure
```
backend/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Auth & error handling
├── models/          # MongoDB schemas
├── routes/          # API routes
├── scripts/         # Seed scripts
├── server.js        # Entry point
└── package.json
```

### Adding New Features
1. Create model in `models/`
2. Create controller in `controllers/`
3. Create routes in `routes/`
4. Import routes in `server.js`

## 🐛 Troubleshooting

**MongoDB connection error:**
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`

**Port already in use:**
- Change PORT in `.env`
- Or kill process: `npx kill-port 5000`

**Admin login fails:**
- Run seed script: `npm run seed`
- Check credentials (default: admin/admin123)

## 📝 License

MIT License - IEEE Core Team

## 👥 Support

For issues or questions, contact the IEEE Core Team.

---

**Event:** TechSymphony - Restore Neurovia  
**Date:** November 10, 2025  
**Venue:** Sir MV Hall

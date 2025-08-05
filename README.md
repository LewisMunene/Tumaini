# 🌟 Tumaini Platform

> **A comprehensive web-based academic stress management platform designed specifically for Strathmore University students**

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [PWA Features](#pwa-features)
- [Crisis Detection](#crisis-detection)
- [Contributing](#contributing)
- [Academic Context](#academic-context)
- [License](#license)

## 🎯 Overview

Tumaini (Swahili for "hope") is an innovative Progressive Web Application designed to address the critical gap in academic stress management for Strathmore University students. The platform provides real-time stress monitoring, digital journaling, peer support networks, and crisis intervention protocols within a unified, accessible digital environment.

### 🎓 Academic Context

This project is developed as part of the Bachelor of Science in Informatics and Computer Science program at Strathmore University, supervised by Mr. Kevin Omondi. It represents a comprehensive solution to the academic stress challenges identified through extensive research and stakeholder consultation.

### 🔗 Live Demo

- **Frontend:** [https://tumaini.vercel.app](https://tumaini.vercel.app) *(Coming Soon)*
- **API Documentation:** [https://tumaini-api.railway.app/docs](https://tumaini-api.railway.app/docs) *(Coming Soon)*

## ✨ Features

### 🧠 Core Wellness Features
- **Daily Stress Tracking** - Quantitative stress monitoring with 1-10 scale ratings
- **Digital Journaling** - Secure, sentiment-aware journaling with keyword tagging
- **Mood Visualization** - Interactive charts and trend analysis
- **Academic Calendar Integration** - Predictive stress analytics based on academic events
- **Crisis Detection** - Real-time keyword-based intervention system

### 👥 Social & Support Features
- **Peer Support Networks** - Anonymous community connections
- **Study Group Formation** - Academic-context peer matching
- **Counselor Integration** - Seamless referral to university counseling services
- **Crisis Intervention** - Immediate alert system for at-risk students

### 📊 Analytics & Reporting
- **Personal Wellness Dashboard** - Individual stress patterns and insights
- **Institutional Analytics** - University-wide wellness trends (anonymized)
- **Intervention Effectiveness** - Measure and improve support strategies
- **Export Capabilities** - PDF reports for counseling sessions

### 🔒 Security & Privacy
- **JWT Authentication** - Secure user sessions
- **Data Encryption** - End-to-end protection of sensitive information
- **GDPR Compliance** - Comprehensive privacy controls
- **Anonymous Options** - Crisis support without identity disclosure

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern functional components with hooks
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **PWA** - Service workers for offline functionality
- **React Router** - Client-side routing and navigation
- **Recharts** - Data visualization for stress analytics
- **React Hook Form** - Performant form handling with validation

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Minimal and flexible web application framework
- **MongoDB** - Document-based NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for secure authentication
- **Helmet** - Security middleware for HTTP headers

### Development & Deployment
- **Git & GitHub** - Version control and collaborative development
- **ESLint & Prettier** - Code quality and formatting
- **Jest & React Testing Library** - Comprehensive testing suite
- **Vercel** - Frontend deployment and hosting
- **Railway** - Backend deployment and database hosting
- **MongoDB Atlas** - Cloud database service

### Crisis Detection Algorithm
- **Keyword Dictionary** - Phrase-based detection system
- **Real-time Monitoring** - Immediate analysis of journal entries
- **Escalation Protocols** - Automated alert system for counselors
- **Privacy-Preserving** - No external ML APIs required

## 📁 Project Structure

```
tumaini-platform/
client/
├── 📁 public/
│   ├── index.html ✅
│   ├── manifest.json (PWA config) 🔄
│   ├── sw.js (Service Worker) 🔄
│   └── 📁 assets/logos/
│       └── tumaini-logo.png ✅
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 auth/
│   │   │   ├── Login.jsx ✅ (WORKING & GORGEOUS!)
│   │   │   ├── Register.jsx ✅ (MULTI-STEP MAGIC!)
│   │   │   ├── ForgotPassword.jsx ✅
│   │   │   └── AuthLayout.jsx ✅
│   │   │
│   │   ├── 📁 layout/
│   │   │   ├── LandingPage.jsx ✅ (MENTAL HEALTH ADVOCACY QUEEN!)
│   │   │   ├── Header.jsx ✅
│   │   │   ├── Footer.jsx ✅
│   │   │   ├── MainLayout.jsx ✅
│   │   │   └── Navbar.jsx ✅
│   │   │
│   │   ├── 📁 checkin/ 🆕 (THE NEW WELLNESS HUB!)
│   │   │   ├── DailyCheckInModal.jsx 🚀 (POPUP MAGIC!)
│   │   │   ├── StressSlider.jsx 🆕 (1-10 scale vibes)
│   │   │   ├── MoodSelector.jsx 🆕 (Emoji mood picker)
│   │   │   ├── SleepQualitySlider.jsx 🆕 (1-10 sleep scale)
│   │   │   ├── CheckInSuccess.jsx 🆕 (Celebration time!)
│   │   │   └── CheckInProgress.jsx 🆕 (Progress indicator)
│   │   │
│   │   ├── 📁 journaling/
│   │   │   ├── JournalEditor.jsx 🔄 (Digital journaling)
│   │   │   ├── JournalEntries.jsx 🔄 (Entry list)
│   │   │   ├── JournalEntry.jsx 🔄 (Single entry)
│   │   │   └── SentimentAnalysis.jsx 🔄 (Crisis detection)
│   │   │
│   │   ├── 📁 analytics/
│   │   │   ├── AnalyticsDashboard.jsx 🔄 (Personal insights)
│   │   │   ├── StressChart.jsx 🔄 (Trend visualization)
│   │   │   ├── MoodChart.jsx 🔄
│   │   │   ├── SleepChart.jsx 🔄
│   │   │   ├── ProgressTracker.jsx 🔄
│   │   │   └── InsightsCard.jsx 🔄
│   │   │
│   │   ├── 📁 resources/
│   │   │   ├── CommunityResources.jsx 🔄 (Support info)
│   │   │   ├── ResourceCard.jsx 🔄
│   │   │   ├── CrisisHotlines.jsx 🔄
│   │   │   ├── CampusCounseling.jsx 🔄
│   │   │   └── SelfHelpMaterials.jsx 🔄
│   │   │
│   │   ├── 📁 crisis/
│   │   │   ├── CrisisAlertButton.jsx 🔄 (Emergency protocols)
│   │   │   ├── CrisisDetector.jsx 🔄 (Automated monitoring)
│   │   │   ├── CrisisResources.jsx 🔄
│   │   │   └── InterventionAlert.jsx 🔄
│   │   │
│   │   ├── 📁 profile/
│   │   │   ├── UserProfile.jsx 🔄
│   │   │   ├── PrivacySettings.jsx 🔄
│   │   │   └── EmergencyContacts.jsx 🔄
│   │   │
│   │   └── 📁 shared/
│   │       ├── LoadingSpinner.jsx 🔄
│   │       ├── ErrorBoundary.jsx 🔄
│   │       └── NotificationToast.jsx 🔄
│   │
│   ├── 📁 pages/
│   │   ├── 📁 protected/ ✅ (PROTECTED ROUTES KINGDOM!)
│   │   │   ├── HomePage.jsx ✅ (ABSOLUTE PERFECTION!)
│   │   │   ├── StressTrackingPage.jsx 🔄 (NEXT UP!)
│   │   │   ├── JournalingPage.jsx 🔄
│   │   │   ├── AnalyticsPage.jsx 🔄
│   │   │   ├── ResourcesPage.jsx 🔄
│   │   │   └── ProfilePage.jsx 🔄
│   │   │
│   │   └── NotFoundPage.jsx 🔄
│   │
│   ├── 📁 hooks/
│   │   ├── useAuth.js ✅ (Authentication state - WORKING!)
│   │   ├── useCheckIn.js 🆕 (Daily check-in logic)
│   │   ├── useStressTracking.js 🔄
│   │   ├── useJournal.js 🔄
│   │   ├── useCrisisDetection.js 🔄
│   │   └── useAnalytics.js 🔄
│   │
│   ├── 📁 services/
│   │   ├── 📁 firebase/
│   │   │   ├── config.js ✅ (Firebase setup - CONFIGURED!)
│   │   │   └── authService.js ✅ (Auth magic - WORKING!)
│   │   ├── checkInService.js 🆕 (Daily check-in CRUD)
│   │   ├── stressTracking.js 🔄 (Stress data operations)
│   │   ├── journal.js 🔄 (Journal CRUD)
│   │   ├── analytics.js 🔄 (Data analysis)
│   │   ├── crisisDetection.js 🔄 (NLP/keyword analysis)
│   │   └── notifications.js 🔄 (PWA notifications)
│   │
│   ├── 📁 contexts/
│   │   ├── AuthContext.jsx ✅ (Global auth state - PERFECT!)
│   │   ├── CheckInContext.jsx 🆕 (Check-in state management)
│   │   ├── StressContext.js 🔄 (Stress data state)
│   │   └── ThemeContext.js 🔄 (UI theme)
│   │
│   ├── 📁 routes/
│   │   └── ProtectedRoute.jsx ✅ (Auth guard - WORKING PERFECTLY!)
│   │
│   ├── 📁 utils/
│   │   ├── constants.js 🔄 (App constants)
│   │   ├── validators.js 🔄 (Form validation)
│   │   ├── dateHelpers.js 🆕 (Check-in timestamps)
│   │   ├── chartHelpers.js 🔄 (Analytics helpers)
│   │   ├── checkInHelpers.js 🆚 (Check-in utilities)
│   │   └── moodEmojis.js 🆕 (Emoji mappings for mood)
│   │
│   ├── 📁 styles/
│   │   ├── index.css ✅
│   │   ├── globals.css 🔄
│   │   ├── 📁 components/ 🔄 (Component-specific styles)
│   │   └── 📁 themes/ 🔄 (Dark/light themes)
│   │
│   ├── App.jsx ✅ (UPDATED WITH ROUTING MAGIC!)
│   └── main.jsx ✅
│
├── 📁 docs/
│   ├── README.md ✅
│   ├── API_DOCUMENTATION.md 🔄
│   ├── DEPLOYMENT_GUIDE.md 🔄
│   └── USER_MANUAL.md 🔄
│
├── 📁 tests/
│   ├── 📁 components/
│   ├── 📁 services/
│   └── 📁 utils/
│
├── package.json ✅
├── firebase.json 🔄 (Firebase hosting config)
├── .env ✅ (Environment variables)
├── .gitignore ✅
└── README.md ✅
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for version control)
- **VS Code** (recommended IDE)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tumaini-platform.git
   cd tumaini-platform
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create `.env` files in both client and server directories:
   
   **Client (.env.local):**
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_APP_NAME=Tumaini Platform
   ```
   
   **Server (.env):**
   ```env
   MONGODB_URI=mongodb://localhost:27017/tumaini
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - React frontend on `http://localhost:5173`
   - Express backend on `http://localhost:3000`

### Manual Setup (Alternative)

If you prefer to set up each part manually:

```bash
# Frontend setup
cd client
npm install
npm run dev

# Backend setup (in new terminal)
cd server
npm install
npm run dev
```

## 💻 Development Workflow

### Available Scripts

**Root Level Scripts:**
- `npm run dev` - Start both frontend and backend
- `npm run client:dev` - Start only React frontend
- `npm run server:dev` - Start only Node.js backend
- `npm run client:build` - Build frontend for production
- `npm run install:all` - Install dependencies for all packages
- `npm run clean` - Remove all node_modules folders

**Client Scripts:**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run Jest tests
- `npm run lint` - Run ESLint

**Server Scripts:**
- `npm run start` - Start production server
- `npm run dev` - Start with nodemon (development)
- `npm run test` - Run server tests

### Development Guidelines

1. **Component Structure** - Use functional components with hooks
2. **Naming Conventions** - PascalCase for components, camelCase for functions
3. **File Organization** - Group related components in feature folders
4. **Git Workflow** - Feature branches with descriptive commit messages
5. **Testing** - Write tests for critical functionality
6. **Documentation** - Comment complex logic and API endpoints

## 🌐 Deployment

### Production Deployment Strategy

**Frontend: Vercel**
- Automatic deployments from GitHub
- Global CDN for fast loading
- PWA support out of the box
- Custom domain configuration

**Backend: Railway**
- Simple Node.js deployment
- Environment variable management
- Auto-scaling capabilities
- Built-in monitoring

**Database: MongoDB Atlas**
- Free tier (512MB storage)
- Global clusters
- Built-in security features
- Backup and recovery

### Deployment Steps

1. **Frontend (Vercel):**
   ```bash
   # Connect GitHub repository to Vercel
   # Set environment variables in Vercel dashboard
   # Deploy automatically on push to main branch
   ```

2. **Backend (Railway):**
   ```bash
   # Connect GitHub repository to Railway
   # Set environment variables
   # Deploy from GitHub integration
   ```

3. **Database (MongoDB Atlas):**
   ```bash
   # Create cluster
   # Whitelist IP addresses
   # Create database user
   # Get connection string
   ```

### Environment Variables (Production)

**Frontend (Vercel):**
- `VITE_API_URL` - Railway backend URL
- `VITE_APP_NAME` - Tumaini Platform

**Backend (Railway):**
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secure random string
- `NODE_ENV` - production
- `FRONTEND_URL` - Vercel frontend URL

## 📚 API Documentation

### Authentication Endpoints

```javascript
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/profile
```

### Stress Tracking Endpoints

```javascript
POST /api/stress/track        # Create stress entry
GET  /api/stress/history      # Get user's stress history
GET  /api/stress/analytics    # Get stress analytics
PUT  /api/stress/:id         # Update stress entry
DELETE /api/stress/:id       # Delete stress entry
```

### Journal Endpoints

```javascript
POST /api/journal/create      # Create journal entry
GET  /api/journal/entries     # Get user's journal entries
PUT  /api/journal/:id        # Update journal entry
DELETE /api/journal/:id      # Delete journal entry
POST /api/journal/analyze    # Analyze entry for crisis keywords
```

### Peer Support Endpoints

```javascript
GET  /api/peer/groups        # Get available support groups
POST /api/peer/join          # Join support group
POST /api/peer/message       # Send group message
GET  /api/peer/messages      # Get group messages
```

### Crisis Intervention Endpoints

```javascript
POST /api/crisis/alert       # Trigger crisis alert
GET  /api/crisis/resources   # Get crisis resources
POST /api/crisis/report      # Report concerning content
```

## 📱 PWA Features

### Offline Functionality
- **Service Worker** - Caches essential app resources
- **Offline Stress Tracking** - Complete daily check-ins without internet
- **Data Synchronization** - Automatic sync when connection resumes
- **Crisis Resources** - Always accessible emergency contacts

### Installation
- **Add to Home Screen** - Install as native app
- **App-like Experience** - Full-screen mode, splash screen
- **Push Notifications** - Daily reminders and crisis alerts
- **Background Sync** - Data sync in background

### Performance
- **Fast Loading** - Cached resources load instantly
- **Smooth Animations** - Optimized for mobile devices
- **Responsive Design** - Works on all screen sizes
- **Touch Gestures** - Native mobile interactions

## 🚨 Crisis Detection System

### Algorithm Overview

The crisis detection system uses a keyword-based approach to identify students who may need immediate assistance:

```javascript
const crisisKeywords = {
  immediate: [
    "commit suicide", "kill myself", "end it all",
    "can't take it anymore", "want to die", "no point living"
  ],
  high_risk: [
    "can't do this anymore", "giving up", "too much pain",
    "nobody cares", "worthless", "better off dead"
  ],
  moderate: [
    "overwhelmed", "can't cope", "falling apart",
    "breaking down", "lost hope", "too stressed"
  ]
}
```

### Detection Process

1. **Real-time Analysis** - Journal entries analyzed on submission
2. **Risk Level Assessment** - Categorize based on keyword severity
3. **Immediate Alerts** - Notify counselors for high-risk situations
4. **Resource Provision** - Provide immediate coping resources
5. **Follow-up Protocols** - Ensure appropriate intervention

### Privacy Considerations

- **Local Processing** - No external APIs for keyword detection
- **Anonymization** - Personal data protected in crisis reports
- **Consent-based** - Users informed about monitoring
- **Opt-out Options** - Ability to disable monitoring

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- **ESLint Configuration** - Follow project linting rules
- **Prettier Formatting** - Consistent code formatting
- **Testing Requirements** - Add tests for new features
- **Documentation** - Update README and comments

### Issue Reporting

Please use GitHub Issues for:
- Bug reports
- Feature requests
- Documentation improvements
- General questions

## 🎓 Academic Context

### Project Objectives

This platform addresses the following academic objectives:

1. **Research Academic Stress** - Investigate current challenges at Strathmore University
2. **Analyze Existing Solutions** - Identify gaps in current digital stress management platforms
3. **Design User-Centered Solution** - Create comprehensive stress tracking and intervention system
4. **Develop Technical Implementation** - Build responsive web application with full CRUD functionality
5. **Implement Analytics** - Provide insights for both individual and institutional use

### Methodology

- **Object-Oriented Analysis and Design (OOAD)** - System architecture approach
- **Incremental Development Model** - Iterative development with user feedback
- **Progressive Web Application** - Modern web technology for accessibility
- **Evidence-Based Design** - Literature review informing platform features

### Expected Outcomes

- Measurable reduction in reported stress levels
- Improved academic performance metrics
- Increased utilization of support services
- Enhanced institutional understanding of student wellness patterns

## 📊 Project Metrics

### Technical Metrics
- **Test Coverage** - Aim for >80% code coverage
- **Performance** - <3s initial load time
- **Accessibility** - WCAG 2.1 AA compliance
- **Mobile Responsiveness** - 100% mobile compatibility

### User Metrics
- **User Engagement** - Daily active users
- **Stress Tracking** - Completion rates for daily check-ins
- **Crisis Intervention** - Response time and effectiveness
- **Support Utilization** - Counseling referral success rates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supervisor:** Mr. Kevin Omondi - Strathmore University
- **Institution:** School of Computing and Engineering Science, Strathmore University
- **Community:** Strathmore University students and counseling staff
- **Research Sources:** Academic literature on digital mental health interventions

## 📞 Contact

**Developer:** Lewis Munene Muthee  
**Student ID:** 138833  
**Email:** [lewis.muthee@strathmore.edu](mailto:your-email@strathmore.edu)  
**Institution:** Strathmore University  
**Supervisor:** Mr. Kevin Omondi  

**Project Links:**
- **Repository:** [https://github.com/yourusername/tumaini-platform](https://github.com/yourusername/tumaini-platform)
- **Live Demo:** [https://tumaini.vercel.app](https://tumaini.vercel.app)
- **Documentation:** [https://tumaini-docs.vercel.app](https://tumaini-docs.vercel.app)

---

*Built with ❤️ for Strathmore University students*

**"Tumaini" - Because every student deserves hope and support in their academic journey** 🌟

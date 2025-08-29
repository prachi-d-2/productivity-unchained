# 🎯 CyberTask - AI-Powered Gaming To-Do Calendar

A revolutionary productivity application that combines cutting-edge AI assistance with cyberpunk gaming aesthetics to make task management engaging and addictive. Designed specifically with ADHD-friendly features and gamification elements to boost productivity and maintain focus.

![CyberTask Demo](https://img.shields.io/badge/Status-Live%20Demo-brightgreen?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## ✨ Features

### 🎮 Gaming-Inspired Design
- **Cyberpunk Aesthetic**: Dark theme with neon cyan, purple, and green accents
- **XP & Level System**: Earn experience points and level up as you complete tasks
- **Achievement Badges**: Unlock achievements for productivity milestones
- **Progress Bars**: Game-style progress tracking for tasks and projects
- **Smooth Animations**: Engaging hover effects and transitions

### 🧠 Smart Task Management
- **Intelligent Task Creation**: Title, description, due dates, and priority levels
- **Real-Time Countdown Timers**: Live countdown showing days/hours/minutes remaining
- **Priority System**: High/Medium/Low with visual color coding and glowing effects
- **Custom Labels**: Organize with tags like College, Personal, Urgent, etc.
- **Project Grouping**: Group related tasks under customizable projects

### 🤖 AI-Powered Insights
- **Schedule Optimization**: AI analyzes your tasks and suggests optimal scheduling
- **Deadline Warnings**: Early warning system for approaching deadlines
- **Productivity Tips**: Personalized recommendations based on your patterns
- **Time Allocation**: Smart suggestions for task complexity and duration

### 🧩 ADHD-Friendly Design
- **Clean Interface**: Uncluttered layout with clear visual hierarchy
- **Color-Coded Systems**: Visual indicators for priorities and categories
- **Gamification Elements**: Progress bars, achievements, and streak counters
- **Focus Modes**: Distraction-free viewing options
- **Mobile Responsive**: Works seamlessly on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed on your system
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd cybertask-todo-calendar
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:8080` to see your application running!

## 📱 Mobile Access & PWA Setup

### Making it Mobile-Friendly
The application is already fully responsive and works great on mobile devices. For the best mobile experience:

1. **Add to Home Screen (iOS)**
   - Open the app in Safari
   - Tap the Share button
   - Select "Add to Home Screen"
   - The app will install as a native-like experience

2. **Add to Home Screen (Android)**
   - Open the app in Chrome
   - Tap the menu (three dots)
   - Select "Add to Home screen"
   - The app will be available as a PWA

### PWA Features
- **Offline Functionality**: Tasks are stored locally and work without internet
- **Native App Feel**: Installs like a native app on mobile devices
- **Fast Loading**: Optimized for quick startup and smooth performance
- **Push Notifications**: Browser notifications for task reminders (configurable)

## 🌐 Free Deployment Options

### Option 1: Vercel (Recommended)
1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI globally
   npm install -g vercel
   
   # Deploy (follow the prompts)
   vercel
   ```

3. **Custom Domain (Optional)**
   - Go to your Vercel dashboard
   - Click on your project
   - Navigate to Settings > Domains
   - Add your custom domain

### Option 2: Netlify
1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Deploy
   netlify deploy --prod --dir=dist
   ```

3. **Alternative: Drag & Drop**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist` folder to the deployment area
   - Your site will be live instantly!

### Option 3: GitHub Pages
1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deployment script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

4. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll to Pages section
   - Select `gh-pages` branch as source

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom cyberpunk design system
- **UI Components**: Shadcn/ui with custom gaming variants
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React hooks + Local Storage
- **Animations**: CSS animations with Tailwind

## 📊 Performance Features

- **Local Storage**: All data persists locally for offline use
- **Optimized Loading**: Fast initial load with lazy loading
- **Mobile Responsive**: Optimized for all screen sizes
- **Smooth Animations**: 60fps animations with hardware acceleration
- **Efficient Rendering**: React optimization for large task lists

## 🎯 Usage Guide

### Creating Tasks
1. Click the "New Task" button
2. Fill in task details (title, description, due date, priority)
3. Assign to a project (optional)
4. Add labels for better organization
5. Click "Create Task" to add it to your list

### Managing Projects
- Group related tasks under projects
- Track overall project progress
- Set project deadlines
- View project completion percentages

### Earning XP & Achievements
- **Task Completion**: 50-100 XP based on priority
- **Daily Streaks**: Bonus XP for consecutive days
- **Project Completion**: Major XP bonuses
- **Achievement Unlocks**: Special rewards for milestones

### AI Insights
- Check the AI Insights panel for personalized recommendations
- Get warnings about approaching deadlines
- Receive productivity tips based on your patterns
- Follow suggestions for optimal task scheduling

## 🔧 Customization

### Changing Colors
Edit `src/index.css` to modify the cyberpunk color scheme:
```css
:root {
  --primary: 180 100% 50%; /* Neon Cyan */
  --secondary: 270 100% 70%; /* Electric Purple */
  --accent: 120 100% 50%; /* Neon Green */
}
```

### Adding New Achievements
Edit `src/utils/sampleData.ts` to add custom achievements:
```typescript
{
  id: 'custom-1',
  title: 'Custom Achievement',
  description: 'Your custom achievement description',
  icon: '🏆',
  type: 'milestone'
}
```

## 🔒 Privacy & Data

- **Local Storage Only**: All your data stays on your device
- **No Backend Required**: No server needed, completely client-side
- **Export/Import**: Backup your data anytime (feature in development)
- **Privacy First**: No tracking, no analytics, no data collection

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Known Issues & Roadmap

### Current Limitations
- Task editing requires recreation (edit dialog in development)
- Project creation UI coming soon
- Notification system in development
- Data export/import feature planned

### Upcoming Features
- [ ] Task editing interface
- [ ] Project creation and management
- [ ] Data backup and restore
- [ ] Real-time collaboration
- [ ] Advanced AI scheduling algorithms
- [ ] Calendar integration
- [ ] Time tracking for tasks
- [ ] Advanced analytics dashboard

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with details about your problem
3. Include your browser version and device information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Inspired by cyberpunk aesthetics and gaming UX
- Built with modern web technologies for maximum performance
- Designed with ADHD-friendly principles in mind
- Special thanks to the open-source community

---

**🎮 Ready to level up your productivity? Start using CyberTask today!**

[Live Demo](https://31524545-0e9d-4831-a7dd-12fbe00ade00.lovableproject.com) | [Report Bug](../../issues) | [Request Feature](../../issues)
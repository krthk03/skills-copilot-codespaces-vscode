# ✈️ AI-Powered Flight Booking POC

A modern React-based flight booking application featuring simulated AI-powered features. Built with React, Vite, Tailwind CSS, and React Router.

## 🌟 Features

### AI-Enhanced User Experience

1. **Smart Search** - Intelligent flight search with AI tips
2. **SmartRank** - AI-powered flight ranking combining price, duration, and reliability
3. **Smart Autofill** - One-click traveler information autofill
4. **AI Baggage Tips** - Personalized baggage recommendations based on trip patterns
5. **AI Insurance Advisor** - Smart insurance plan recommendations
6. **AI Seat Recommender** - Optimal seat selection based on comfort-to-price ratio
7. **Smart Review Summary** - AI-generated booking review with confidence scores
8. **Smart Alerts** - Optional flight change notifications

### Pages

1. **Home** (`/`) - Flight search with Smart Search
2. **Results** (`/results`) - Flight listings with SmartRank, Cheapest, and Fastest tabs
3. **Traveler** (`/traveler`) - Passenger information with Smart Autofill
4. **Extras** (`/extras`) - Baggage and insurance selection with AI recommendations
5. **Seat Selection** (`/seat`) - Interactive seat map with AI recommendations
6. **Checkout** (`/checkout`) - Order summary and payment with Smart Review

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd flight-booking-poc
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## 🎨 Design System

### Colors

- **CHECK24 Blue**: `#004B9C` - Primary brand color
- **CHECK24 Light Blue**: `#E6F0FF` - AI highlights and info boxes
- **Font**: Inter (Google Fonts)

### Component Structure

```
src/
├── components/          # Shared components
│   ├── AIBadge.jsx     # AI verification badge
│   ├── InfoBanner.jsx  # AI info banners
│   ├── Tooltip.jsx     # Hover tooltips
│   └── SmartSummaryBox.jsx  # AI summary boxes
├── pages/              # Page components
│   ├── Home.jsx        # Search page
│   ├── Results.jsx     # Flight results
│   ├── Traveler.jsx    # Traveler info form
│   ├── Extras.jsx      # Add-ons selection
│   ├── Seat.jsx        # Seat selection
│   └── Checkout.jsx    # Payment & confirmation
├── mockData.js         # Mock flight & traveler data
├── App.jsx             # Main app with routing
└── main.jsx            # Entry point
```

## 🧠 AI Features (Simulated)

All AI features are simulated using mock data and static logic:

- **Smart Search**: Pre-defined search tips
- **SmartRank**: Calculated score based on price, duration, and reliability
- **Smart Autofill**: Loads pre-defined traveler data
- **AI Tips**: Static recommendation messages
- **Smart Review**: Pre-composed summary text
- **Smart Alerts**: Simple toggle state

## 📦 Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## 🎯 Use Case

This POC demonstrates:

- Modern React component architecture
- Clean, responsive UI design
- State management with React hooks
- Multi-step form flows
- Simulated AI/ML feature integration
- Professional booking flow UX

Perfect for:

- Technical interviews
- Portfolio demonstrations
- UI/UX prototyping
- Learning React and Tailwind

## 📝 Notes

- No backend or real AI - everything is client-side with mock data
- No payment processing - booking completes with a success screen
- Responsive design optimized for desktop and mobile
- Clean, production-ready code structure

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (if configured)

## 📄 License

This is a proof-of-concept project for demonstration purposes.


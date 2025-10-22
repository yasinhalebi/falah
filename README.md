# Prayer Times App

A modern React application that displays prayer times for different locations with multi-language support (Arabic, English, Turkish).

## Features

- 🌍 Multi-language support (Arabic, English, Turkish)
- 🕌 Prayer times for any location
- 📱 Responsive design with Tailwind CSS
- 🎨 Beautiful UI with mosque backgrounds
- ⏰ Countdown to next prayer
- 📖 Daily Ayah and Hadith

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Deployment on Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect it's a React app and deploy it
4. The app will be available at your Vercel URL

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to Vercel

## Technologies Used

- React 18
- Tailwind CSS
- React Icons
- i18next (Internationalization)
- React Router
- React Select
- React Flags Select

## Project Structure

```
src/
├── components/          # React components
│   ├── CountDown.js    # Prayer countdown component
│   ├── DailyAyahHadith.js # Daily religious content
│   ├── Footer.js       # Footer component
│   ├── Header.js       # Header with language switcher
│   ├── Home.js         # Main home component
│   ├── Location.js     # Location selection
│   ├── PrayerCard.js   # Individual prayer time card
│   └── Wahy.js         # Additional content component
├── data/               # Static data
│   └── countries.js    # Country list
├── imgs/              # Images and assets
├── App.js             # Main App component
├── index.js           # Entry point
└── i18n.js            # Internationalization config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import './i18n.js';
import Footer from './components/Footer.js';
import DailyAyahHadith from './components/DailyAyahHadith.js';

function App() {
  return (
    <div className="dark:bg-gray-800 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Home />
        <DailyAyahHadith />
      </main>
      <Footer />
    </div>
  );
}

export default App;

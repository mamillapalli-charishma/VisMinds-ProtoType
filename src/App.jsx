import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreativeAssistant from './pages/CreativeAssistant';
import ContentStrategist from './pages/ContentStrategist';
import Insights from './pages/Insights';
import TheCouncil from './pages/TheCouncil';
import Settings from './pages/Settings';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {

  console.log("ENV KEY:", import.meta.env.VITE_GOOGLE_API_KEY);

  return (
    <SettingsProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="creative-assistant" element={<CreativeAssistant />} />
              <Route path="content-strategist" element={<ContentStrategist />} />
              <Route path="insights" element={<Insights />} />
              <Route path="the-council" element={<TheCouncil />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </SettingsProvider>
  );
}

export default App;

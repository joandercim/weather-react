import { useState } from 'react'
import './App.css'
import Header from './components/UserInputSection';
import { WeatherProvider } from './context/WeatherContext';
import BackgroundOverlay from './components/shared/BackgroundOverlay';

function App() {
  const [count, setCount] = useState(0);

  return (
    <WeatherProvider>
    <BackgroundOverlay />
    <Header />
    </WeatherProvider>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Header from './components/UserInputSection';
import { WeatherProvider } from './context/WeatherContext';

function App() {
  const [count, setCount] = useState(0);

  return (
    <WeatherProvider>
    <Header />
    </WeatherProvider>
  )
}

export default App

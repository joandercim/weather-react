import { useContext } from 'react';
import './App.css';
import Header from './components/UserInputSection';
import WeatherContext from './context/WeatherContext';
import BackgroundOverlay from './components/shared/BackgroundOverlay';
import ResponseContainer from './components/ResponseContainer';
import Modal from './components/Modal';

function App() {
  const { modalOpen } = useContext(WeatherContext);
  return (
      <div className="container text-center">
        <Modal className={modalOpen ? 'modal show' : 'modal'}/>
        <BackgroundOverlay />
        <Header />
        <ResponseContainer />
      </div>
  );
}

export default App;

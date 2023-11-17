import { useContext } from 'react';
import WeatherContext from '../../context/WeatherContext';

function BackgroundOverlay() {
  const { userWeatherType } = useContext(WeatherContext);
  return <div className={`overlay ${userWeatherType}`}></div>;
}
export default BackgroundOverlay;

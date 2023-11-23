import { useContext, useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import WeatherContext from '../context/WeatherContext';
import { useSpring, animated } from 'react-spring';
import WeatherWidget from './WeatherWidget';

interface ModalProps {
  className: string;
}

function Modal({ className }: ModalProps) {
  const { matches, closeModal, cityInFocus, modalOpen } =
    useContext(WeatherContext);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [cityInfo, setCityInfo] = useState({ outputString: '', title: '' });

  useEffect(() => {
    const matchesFiltered = matches.filter((city) => city.city === cityInFocus);

    if (matchesFiltered.length > 0) {
      const weather = matchesFiltered[0].data.timeSeries[0];
      setCurrentWeather(weather);
    } else {
      setCurrentWeather(null);
    }
  }, [cityInFocus]);

  useEffect(() => {
    if (cityInFocus) {
      getCityInfo(cityInFocus).then((info) => setCityInfo(info));
    }
  }, [cityInFocus]);

  const airTemp = currentWeather
    ? currentWeather.parameters[10].values[0]
    : null;
  const windSpeed = currentWeather
    ? currentWeather.parameters[14].values[0]
    : null;
  const precipi = currentWeather
    ? currentWeather.parameters[5].values[0]
    : null;
  const thunderProb = currentWeather
    ? currentWeather.parameters[16].values[0]
    : null;
  const horizontalVisibility = currentWeather
    ? currentWeather.parameters[12].values[0]
    : null;

  function NumberTicker({ num }) {
    const { number } = useSpring({
      from: { number: 0 },
      number: num,
      delay: 200,
      config: {
        mass: 1,
        tension: 20,
        friction: 5,
      },
    });
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
  }

  async function getCityInfo(city: string) {
    try {
      const res = await fetch(`api/${city}`);
      const data = await res.json();
      const pageId = Object.keys(data.query.pages);
      const summary = data.query.pages[pageId].extract;
      const outputString = summary.replace(/\(.*?\)/, '');
      const title: string = data.query.pages[pageId].title;

      return { outputString, title };
    } catch (error) {
      console.error('Error fetching city info', error)
      return { outputString: 'Information not available', title: 'Error'}
    }
  }

  return (
    <div className={className}>
      <FaXmark className="fa-solid" onClick={closeModal} />
      <div className="information">
        <h1>{cityInfo.title}</h1>
        <div className="city-info">
          <p>{cityInfo.outputString}</p>
        </div>
      </div>
      <div className="widget-container">
        <WeatherWidget num={airTemp} text={'Air Temp'} value={"°C"}/>
        <WeatherWidget num={windSpeed} text="Wind Speed" value={"m/s"}/>
        <WeatherWidget num={precipi} text="Precipitation intensity" value={"mm/h"}/>
        <WeatherWidget num={thunderProb} text="Thunder probability" value={"%"}/>
        <WeatherWidget num={(horizontalVisibility)} text="Horizontal visibility" value={"km"}/>
      </div>
    </div>
  );
}
export default Modal;

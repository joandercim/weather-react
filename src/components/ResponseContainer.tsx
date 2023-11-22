import { useContext, useEffect, useState } from 'react';
import WeatherContext from '../context/WeatherContext';
import ResponseCard from './ResponseCard';

import {
  FaCloudShowersHeavy,
  FaCloud,
  FaSmog,
  FaSnowflake,
} from 'react-icons/fa';
import { FaCloudBolt } from 'react-icons/fa6';
import { RiSunFill } from 'react-icons/ri';

interface StoredCityInterface {
    lat: number;
    lng: number;
    city: object;
    data: any;
  }

const iconMapper = {
  RiSunFill: RiSunFill,
  FaCloud: FaCloud,
  FaCloudBolt: FaCloudBolt,
  FaCloudShowersHeavy: FaCloudShowersHeavy,
  FaSnowflake: FaSnowflake,
  FaSmog: FaSmog,
};

function ResponseContainer() {
  const [weatherIcon, setWeatherIcon] = useState('');
  const { userWeatherType, matches } = useContext(WeatherContext);
  const IconComponent = weatherIcon ? iconMapper[weatherIcon] : null;

  useEffect(() => {
    switch (userWeatherType) {
      case 'clear-skies':
        setWeatherIcon('RiSunFill');
        break;
      case 'cloudy':
        setWeatherIcon('FaCloud');
        break;
      case 'thunder':
        setWeatherIcon('FaCloudBolt');
        break;
      case 'raining':
        setWeatherIcon('FaCloudShowersHeavy');
        break;
      case 'snowing':
        setWeatherIcon('FaSnowflake');
        break;
      case 'foggy':
        setWeatherIcon('FaSmog');
        break;
    }
  }, [userWeatherType]);

  return (
    <div id="response" className="container">
      <div className="response-cards">
        {matches.map((city: StoredCityInterface) => (
          <ResponseCard key={city.city}IconComponent={IconComponent} city={city} />
        ))}
      </div>
    </div>
  );
}
export default ResponseContainer;

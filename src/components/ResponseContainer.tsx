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


type WeatherIconName = 'RiSunFill' | 'FaCloud' | 'FaCloudBolt' | 'FaCloudShowersHeavy' | 'FaSnowflake' | 'FaSmog';

interface CityMatchInterface {
  city: string,
  lng: string,
  lat: string,
  data: {
    approvedTime: string,
    geometry: {
      type: string,
      coordinates: number[]
    }
    timeSeries: WeatherDataInterface[]
  }
}

interface WeatherDataInterface {
  parameters: Array<{
    validTime: string,
    values: number[]
  }>
}

const iconMapper: { [key in WeatherIconName]: React.ComponentType } = {
  RiSunFill: RiSunFill,
  FaCloud: FaCloud,
  FaCloudBolt: FaCloudBolt,
  FaCloudShowersHeavy: FaCloudShowersHeavy,
  FaSnowflake: FaSnowflake,
  FaSmog: FaSmog,
};

function ResponseContainer() {
  const [weatherIcon, setWeatherIcon] = useState<WeatherIconName | ''>('');
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

  const noResultsResponse = userWeatherType !== '' ? <h2>Sorry, there is not going to be {userWeatherType} in any of our cities today.</h2> : null;

  return (

    matches.length > 0 ?
    <div id="response" className="container">
      <h2 className='text-center'>Yes! There currently {userWeatherType} in {matches.length} cities.</h2>
      <div className="response-cards">
        {matches.map((city: CityMatchInterface) => (
          <ResponseCard key={city.city} IconComponent={IconComponent} city={city} />
        ))}
      </div>
    </div> 
    : 
    noResultsResponse
  );
}
export default ResponseContainer;

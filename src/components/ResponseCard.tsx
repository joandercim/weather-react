import {useContext} from 'react';
import WeatherContext from '../context/WeatherContext';

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

interface ResponseCardProps {
  IconComponent: React.ComponentType<{ className?: string }> | null;
  city: CityMatchInterface
}

function ResponseCard({ IconComponent, city }: ResponseCardProps) {

    const { handleReadMore } = useContext(WeatherContext)

  return (
    <div className="card">
      {IconComponent && <IconComponent className="fa-solid" />}
      <h3>{city.city}</h3>
      <div className="coordinates">
        <p>
          <em>LAT: {city.lat}</em>
        </p>
        <p>
          <em>LNG: {city.lng}</em>
        </p>
      </div>
      <p className="more btn" id={city.city} onClick={(e) => handleReadMore((e.target as HTMLParagraphElement).id)}>
        Read more
      </p>
    </div>
  );
}
export default ResponseCard;

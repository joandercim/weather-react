import {useContext} from 'react';
import WeatherContext from '../context/WeatherContext';

interface StoredCityInterface {
    lat: number;
    lng: number;
    city: object;
    data: any;
  }

function ResponseCard({ IconComponent, city }) {

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
      <p className="more btn" id={city.city} onClick={(e) => handleReadMore(e.target.id)}>
        Read more
      </p>
    </div>
  );
}
export default ResponseCard;

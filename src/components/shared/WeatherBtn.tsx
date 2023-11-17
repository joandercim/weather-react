import { IconType } from 'react-icons';
import { useContext } from 'react';
import WeatherContext from '../../context/WeatherContext';

interface WeatherBtnProps {
  id: string;
  IconComponent: IconType;
}

function WeatherBtn({ id, IconComponent }: WeatherBtnProps) {
    const {setWeatherType} = useContext(WeatherContext)

  return (
    <div id={id} className="btn" onClick={() => setWeatherType(id)}>
      <IconComponent className="fa-solid" />
    </div>
  );
  
}
export default WeatherBtn;

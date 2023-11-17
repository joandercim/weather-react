import WeatherBtn from './shared/WeatherBtn';
import weatherButtons from './shared/misc/weatherButtons';

function Buttons() {
  return (
    <div className="buttons">
      {weatherButtons.map(({id, Icon}) => <WeatherBtn key={id} id={id} IconComponent={Icon} />)}
    </div>
  );
}

export default Buttons;

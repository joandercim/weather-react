import { useSpring, animated } from 'react-spring';

interface WeatherWidgetProps {
  num: number | null,
  text: string, 
  value: string
}

interface NumberTickerInterface {
  num: number | null
}

function WeatherWidget({ num, text, value }: WeatherWidgetProps) {

    function NumberTicker({ num }: NumberTickerInterface) {
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
        if (num !== null) {
          if (text === 'Air Temp' && num < 10) {
            return <animated.div>{number.to((n) => n.toFixed(1))}</animated.div>;
          } else {
            return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
          }
        }
      }

  return (
    <div className="widget">
      <p className="widget-heading">{text}</p>
      <div className="circle">
        <span className="num" id="air-temp">
          <NumberTicker num={num} />
        </span>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default WeatherWidget;

import { useSpring, animated } from 'react-spring';

function WeatherWidget({ num, text, value }) {

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

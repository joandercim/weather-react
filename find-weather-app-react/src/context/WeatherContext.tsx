import { createContext, useState, useEffect } from 'react';
import cities from '../data/cities-development.json';

interface StoredCityInterface {
  lat: number;
  lng: number;
  city: object;
  data: any;
}

const initialWeatherStateTemp: any = {
  test: true,
};

const WeatherContext = createContext(initialWeatherStateTemp);

// FIXA TILL "ANY" HÄR NEDAN
export const WeatherProvider = ({ children }: any) => {
  const [fetchedCities, setFetchedCities] = useState<StoredCityInterface[]>([]);
  const [matches, setMatches] = useState<StoredCityInterface[]>([]);
  const [userWeatherType, setUserWeatherType] = useState('');
  const [weatherCodes, setWeatherCodes] = useState<number[]>([]);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    setFetchedCities([]);
    getWeatherByCity();
    setHasRendered(true);
  }, []);

  useEffect(() => {
    if (userWeatherType !== '') {
      interpretUserInput(userWeatherType);
    }
  }, [userWeatherType]);

  useEffect(() => {
    if (hasRendered) {
      if (matches.length !== 0) {
        console.log('matches changed', matches)
        // This is from where we DISLPAY RESULTS
      } else {
        console.log('No matches found');
      }
    }
  }, [matches]);

  useEffect(() => {
    if (weatherCodes.length !== 0) {
      filterMatchingWeather(weatherCodes);
    }
  }, [weatherCodes]);

  const interpretUserInput = (userInput: string) => {
    let weatherIcon = '';
    switch (userInput) {
      case 'clear-skies':
        setWeatherCodes([1, 2, 3]);
        weatherIcon = 'sun';
        // backgroundElement.style.backgroundImage =
        //   'url(https://images.unsplash.com/photo-1550133730-695473e544be?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
        break;
      case 'cloudy':
        setWeatherCodes([5, 6]);
        weatherIcon = 'cloud';
        // backgroundElement.style.backgroundImage =
        //   'url(https://images.unsplash.com/photo-1485249245068-d8dc50b77cc7?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
        break;
      case 'foggy':
        weatherIcon = 'smog';
        // backgroundElement.style.backgroundImage =
        //   'url(https://images.unsplash.com/photo-1541480110211-586977e40589?q=80&w=2693&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
        setWeatherCodes([7]);
        break;
      case 'raining':
        weatherIcon = 'cloud-showers-heavy';
        // backgroundElement.style.backgroundImage =
        //   'url(https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
        setWeatherCodes([8, 9, 10, 18, 19, 20]);
        break;
      case 'thunder':
        weatherIcon = 'cloud-bolt';
        // backgroundElement.style.backgroundImage =
        //   'url(https://images.unsplash.com/photo-1431440869543-efaf3388c585?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
        setWeatherCodes([21, 11]);
        break;
      case 'snowing':
        weatherIcon = 'snowflake';
        setWeatherCodes([25, 26, 27, 13, 14, 15, 16, 17]);
        // backgroundElement.style.backgroundImage =
        //   'url(https://images.unsplash.com/photo-1577457943926-11193adc0563?q=80&w=2702&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
        break;
    }
  };

  function filterMatchingWeather(weatherCodes: number[]) {
    let matchesArray = [];
    weatherCodes.forEach((weatherCode) => {
      matchesArray = fetchedCities.filter((city) => {
        const weatherType = city.data.timeSeries[0].parameters[18].values[0];
        return weatherCodes.includes(weatherType)
      });
    });
    setMatches([...matchesArray])
  }

  // Hämta väder, stad för stad
  const fetchCurrentWeather = async (inputCity: any) => {
    const { city, lng, lat } = inputCity;

    try {
      // const res = await fetch(`/weather/${lng}/${lat}`);
      const res = await fetch(
        `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lng}/lat/${lat}/data.json`
      );

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      // Create new city with data from local json and SMHI
      const storedCity: StoredCityInterface = {
        lat,
        lng,
        city,
        data,
      };

      // setFetchedCities((prev) => [...prev, storedCity]);
      setFetchedCities((prev) => [...prev, storedCity]);
    } catch (error) {
      console.log(`Ett fel uppstod vid hämtning av ${city}: ${error}`);
    }
  };

  // Fetch weather data
  const getWeatherByCity = async () => {
    const promises = cities.map((city) => fetchCurrentWeather(city));
    await Promise.all(promises);
  };

  // Set weathertype
  const setWeatherType = (id) => {
    setUserWeatherType(id);
  };

  // Filter weather

  return (
    <WeatherContext.Provider
      value={{
        setWeatherType,
        fetchedCities,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;

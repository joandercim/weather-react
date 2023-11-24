import { createContext, useState, useEffect } from 'react';
import cities from '../data/cities-development.json';

const initialWeatherStateTemp: any = {
  test: true,
};

interface StoredCityInterface {
  lat: number;
  lng: number;
  city: object;
  data: any;
}

const WeatherContext = createContext(initialWeatherStateTemp);

// FIXA TILL "ANY" HÄR NEDAN
export const WeatherProvider = ({ children }: any) => {
  const [fetchedCities, setFetchedCities] = useState<StoredCityInterface[]>([]);
  const [matches, setMatches] = useState<StoredCityInterface[]>([]);
  const [userWeatherType, setUserWeatherType] = useState('');
  const [weatherCodes, setWeatherCodes] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [cityInFocus, setCityInFocus] = useState('');
  const [fetchedCitiesCount, setFetchedCitiesCount] = useState(0);
  const [progress, setProgress] = useState(0);
  let fetchedCount = 0;

  useEffect(() => {
    setFetchedCities([]);
    getWeatherByCity();
  }, []);

  useEffect(() => {
    if (userWeatherType !== '') {
      interpretUserInput(userWeatherType);
    }
  }, [userWeatherType]);

  useEffect(() => {
    if (weatherCodes.length !== 0) {
      filterMatchingWeather(weatherCodes);
    }
  }, [weatherCodes]);

  const interpretUserInput = (userInput: string) => {
    switch (userInput) {
      case 'clear-skies':
        setWeatherCodes([1, 2, 3]);
        break;
      case 'cloudy':
        setWeatherCodes([5, 6]);
        break;
      case 'foggy':
        setWeatherCodes([7]);
        break;
      case 'raining':
        setWeatherCodes([8, 9, 10, 18, 19, 20]);
        break;
      case 'thunder':
        setWeatherCodes([21, 11]);
        break;
      case 'snowing':
        setWeatherCodes([25, 26, 27, 13, 14, 15, 16, 17]);
        break;
    }
  };

  function filterMatchingWeather(weatherCodes: number[]) {
    let matchesArray: StoredCityInterface[] = [];
    weatherCodes.forEach(() => {
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
      fetchedCount++;
      console.log(fetchedCount)
      
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
  const setWeatherType = (id: string) => {
    setUserWeatherType(id);
  };

  const handleReadMore = (id:string) => {
    setModalOpen(true);
    setCityInFocus(id);
  }

  function closeModal() {
    setModalOpen(false)
  }


  // Filter weather

  return (
    <WeatherContext.Provider
      value={{
        setWeatherType,
        handleReadMore,
        closeModal,
        fetchedCities,
        userWeatherType,
        matches,
        modalOpen,
        cityInFocus,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;

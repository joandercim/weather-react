import {
    FaCloudShowersHeavy,
    FaCloud,
    FaSmog,
    FaSnowflake,
} from 'react-icons/fa';
import { FaCloudBolt } from 'react-icons/fa6';
import { RiSunFill } from 'react-icons/ri';

const weatherButtons = [
    {
      id: 'clear-skies',
      Icon: RiSunFill,
    },
    {
        id: 'cloudy',
        Icon: FaCloud,
      },
      {
        id: 'thunder',
        Icon: FaCloudBolt,
      },
      {
        id: 'raining',
        Icon: FaCloudShowersHeavy,
      },
      {
        id: 'snowing',
        Icon: FaSnowflake,
      },
      {
        id: 'foggy',
        Icon: FaSmog,
      },
  ];

export default weatherButtons
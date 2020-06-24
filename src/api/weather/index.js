import axios from 'axios';

export const fetchWeatherApi = async () => {
  const URL = 'http://api.weatherstack.com';
  const API_KEY = 'ee2c00a09ba65e4467143d28625d3fa2';

  /* SANKT-PETERSBURG - MURINO */
  const latitude = 60.0409852;
  const longitude = 30.4521008;

  const response = await axios.get(
    `${URL}/current?access_key=${API_KEY}&query=${latitude},${longitude}`
  );
  return response.data;
};

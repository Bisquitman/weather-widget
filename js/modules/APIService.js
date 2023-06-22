const API_URI = 'https://api.openweathermap.org/data/2.5';
// const API_KEY = '439d4b804bc8187953eb36d2a8c26a02';
const API_KEY = '2389a7511d2466e4ffedbac0df80d7d5';

export const fetchWeather = async (city) => {
  const urlWeather = new URL(`${API_URI}/weather`);
  urlWeather.searchParams.set('units', 'metric');
  urlWeather.searchParams.set('q', city);
  urlWeather.searchParams.set('appid', API_KEY);
  urlWeather.searchParams.set('lang', 'ru');

  try {
    const response = await fetch(urlWeather);

    if (!response.ok || response.status === 404) {
      throw new Error('Ошибка запроса');
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const fetchForecast = async (city) => {
  try {
    const response = await fetch(`${API_URI}/forecast?units=metric&q=${city}&appid=${API_KEY}&lang=ru`);

    if (!response.ok || response.status === 404) {
      throw new Error('Ошибка запроса');
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

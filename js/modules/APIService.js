const API_URI = 'https://api.openweathermap.org/data/2.5';
// const API_KEY = '439d4b804bc8187953eb36d2a8c26a02';
const API_KEY = '2389a7511d2466e4ffedbac0df80d7d5';

export const fetchWeather = async (city) => {
  try {
    const response = await fetch(
      `${API_URI}/weather?q=${city}&appid=${API_KEY}&lang=ru`,
    );

    if (!response.ok || response.status === 404) {
      throw new Error('Ошибка запроса');
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

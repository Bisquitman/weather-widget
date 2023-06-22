import { fetchForecast, fetchWeather } from './APIService.js';
import {
  renderWidgetForecast,
  renderWidgetOther,
  renderWidgetToday,
  showError,
} from './render.js';

export const startWidget = async () => {
  const city = 'Минск';

  const widget = document.createElement('div');
  widget.className = 'widget';

  const dataWeather = await fetchWeather(city);
  console.log('dataWeather: ', dataWeather.data);

  if (dataWeather.success) {
    renderWidgetToday(widget, dataWeather.data);
    renderWidgetOther(widget, dataWeather.data);
  } else {
    showError(widget, dataWeather.error);
  }

  const dataForecast = await fetchForecast(city);

  if (dataForecast.success) {
    renderWidgetForecast(widget, dataForecast.data);
  } else {
    showError(widget, dataForecast.error);
  }

  return widget;
};

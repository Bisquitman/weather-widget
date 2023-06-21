import { fetchWeather } from './APIService.js';
import {
  renderWidgetForecast,
  renderWidgetOther,
  renderWidgetToday,
} from './render.js';

export const startWidget = async () => {
  const widget = document.createElement('div');
  widget.className = 'widget';

  const dataWeather = await fetchWeather('Минск');

  if (dataWeather.success) {
    renderWidgetToday(widget, dataWeather.data);
    renderWidgetOther(widget, dataWeather.data);
  } else {
    showError();
  }

  renderWidgetForecast(widget);

  return widget;
};

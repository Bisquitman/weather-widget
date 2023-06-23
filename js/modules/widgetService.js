import { cityServiceSearch } from './cityServiceSearch.js';
import { fetchForecast, fetchWeather, getCity } from './APIService.js';
import {
  preloader,
  renderWidgetForecast,
  renderWidgetOther,
  renderWidgetToday,
  showError,
} from './render.js';

export const startWidget = async (city, widget) => {
  if (!city) {
    const dataCity = await getCity();

    if (dataCity.success) {
      city = dataCity.city;
    } else {
      showError(widget, dataCity.error);
    }
  }

  if (!widget) {
    widget = document.createElement('div');
    widget.className = 'widget';
  }
  widget.textContent = '';
  widget.append(preloader());

  Promise.all([fetchWeather(city), fetchForecast(city)]).then((data) => {
    widget.textContent = '';

    const dataWeather = data[0];
    const dataForecast = data[1];

    if (dataWeather.success) {
      renderWidgetToday(widget, dataWeather.data);
      renderWidgetOther(widget, dataWeather.data);
    } else {
      showError(widget, dataWeather.error);
    }

    if (dataForecast.success) {
      renderWidgetForecast(widget, dataForecast.data);
    } else {
      showError(widget, dataForecast.error);
    }

    cityServiceSearch(widget);
  });

  return widget;
};

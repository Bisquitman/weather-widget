import {
  calcDewPoint,
  getCurrentDateTime,
  getWeatherForecastData,
} from './utils.js';
import { startWidget } from './widgetService.js';

export const renderWidgetToday = (widget, data) => {
  console.log('data: ', data);
  const { dateStr, timeStr, weekdayStr } = getCurrentDateTime(data);

  widget.insertAdjacentHTML(
    'beforeend',
    `
      <div class="widget__today">
        <div class="widget__date-block">
          <div class="widget__renew">
            <button type="button" class="widget__change-renew" aria-label="Обновить прогноз" title="Обновить прогноз"></button>
            <p class="widget__date-title">Обновлено:</p>
          </div>
          <p class="widget__date">${dateStr}</p>
          <p class="widget__time">${timeStr}</p>
          <p class="widget__day">${weekdayStr}</p>
        </div>

        <div class="widget__icon">
          <img class="widget__img" src="./icon/${
            data.weather[0].icon
          }.svg" alt="${data.weather[0].description}" title="${
      data.weather[0].description
    }">
          <p class="widget__icon-description">${data.weather[0].description}</p>
        </div>
        
        <div class="widget__wheather">
          <div class="widget__city">
            <p>${data.name}</p>
            <button class="widget__change-city" aria-label="Изменить город" title="Выбрать город"></button>
          </div>
          <p class="widget__temp-big">${data.main.temp.toFixed(1)}°C</p>
          <p class="widget__felt">ощущается</p>
          <p class="widget__temp-small">${data.main.feels_like.toFixed(1)}°C</p>
        </div>
      </div>
    `,
  );

  const widgetRenewBtn = widget.querySelector('.widget__change-renew');
  widgetRenewBtn.style.display = 'none';
  widgetRenewBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await startWidget(data.name);
  });
};

export const renderWidgetOther = (widget, data) => {
  const {
    main: { temp, humidity, pressure },
    wind,
  } = data;

  widget.insertAdjacentHTML(
    'beforeend',
    `
      <div class="widget__other">
        <div class="widget__wind">
          <p class="widget__wind-title">Ветер</p>
          <p class="widget__wind-speed">
            <svg viewBox="0 0 1000 1000" style="display:inline-block;width:18px;height:18px;transform:rotate(${
              wind.deg + 180
            }deg);"><g fill="#48484a"><path d="M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"></path><path d="M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z"></path></g></svg>&nbsp;${wind.speed.toFixed(
      2,
    )}&nbsp;м/с
          </p>
          <p class="widget__wind-gust">${
            wind.gust ? `порывы до ${wind.gust}&nbsp;м/с` : ''
          }</p>
        </div>

        <div class="widget__humidity">
          <p class="widget__humidity-title">Влажность</p>
          <p class="widget__humidity-value">${humidity.toFixed(0)}%</p>
          <p class="widget__humidity-text">т.р.: ${calcDewPoint(
            temp,
            humidity,
          ).toFixed(1)}°C</p>
        </div>

        <div class="widget__pressure">
          <p class="widget__pressure-title">Давление</p>
          <p class="widget__pressure-value">${(
            pressure * 0.750063755419211
          ).toFixed(2)}</p>
          <p class="widget__pressure-text">мм рт.ст.</p>
        </div>
      </div>
    `,
  );
};

export const renderWidgetForecast = (widget, data) => {
  const widgetForecast = document.createElement('ul');
  widgetForecast.className = 'widget__forecast';
  widget.append(widgetForecast);

  const forecastData = getWeatherForecastData(data);

  const items = forecastData.map((item) => {
    const widgetDayItem = document.createElement('li');
    widgetDayItem.className = 'widget__day-item';
    widgetDayItem.insertAdjacentHTML(
      'beforeend',
      `
      <p class="widget__day-text">${item.dayOfWeek}</p>
      <img class="widget__day-img" src="./icon/${item.weatherIcon}.svg" alt="${
        item.description
      }" title="${item.description}">
      <p class="widget__day-temp">${item.minTemp.toFixed(
        1,
      )}°/${item.maxTemp.toFixed(1)}°</p>
    `,
    );
    return widgetDayItem;
  });

  widgetForecast.append(...items);
};

export const showError = (widget, error) => {
  widget.textContent = error.toString();
  widget.classList.add('widget_error');
};

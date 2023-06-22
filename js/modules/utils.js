export const leadingZero = (n) => (n < 10 ? `0${n}` : n);

export const getCurrentDateTime = (data) => {
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];

  const weekDays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];

  const currentDate = new Date((data.dt) * 1000);

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  const currentWeekDay = weekDays[currentDate.getDay()];

  const hours = leadingZero(currentDate.getHours());
  const minutes = leadingZero(currentDate.getMinutes());

  const dateStr = `${currentDayOfMonth} ${currentMonth} ${currentYear}`;
  const timeStr = `${hours}:${minutes}`;
  const weekdayStr = currentWeekDay;

  return { dateStr, timeStr, weekdayStr };
};

export const getCurrentDateTimeIntl = () => {
  const date = new Date();

  const dateFormat = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const timeFormat = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const weekdayFormat = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
  });

  const dateStr = dateFormat.format(date).replace('.', '').replace(' г.', '');
  const timeStr = timeFormat.format(date);
  const weekdayStr = weekdayFormat.format(date);

  return { dateStr, timeStr, weekdayStr };
};

export const getWindDirection = (deg) => {
  const directions = [
    '&#8593;',
    '&#8599;',
    '&#8594;',
    '&#8600;',
    '&#8595;',
    '&#8601;',
    '&#8592;',
    '&#8598;',
  ];

  const i = Math.round(deg / 45 + 180) % 8;

  return directions[i];
};

export const calcDewPoint = (temp, humidity) => {
  const a = 17.27; // постоянная
  const b = 237.7; // постоянная
  const f = (a * temp) / (b + temp) + Math.log(humidity / 100);
  return (b * f) / (a - f); // Формула для расчёта точки росы
};

export const getWeatherForecastData = (data) => {
  const forecast = data.list.filter(
    (item) =>
      new Date(item.dt_txt).getHours() === 12 &&
      new Date(item.dt_txt).getDate() > new Date().getDate() &&
      new Date(item.dt_txt).getDate() < new Date().getDate() + 5,
  );

  const forecastData = forecast.map((item) => {
    const date = new Date(item.dt_txt);
    const weekDaysShort = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

    const dayOfWeek = weekDaysShort[date.getDay()];
    const weatherIcon = item.weather[0].icon;
    let minTemp = Infinity;
    let maxTemp = -Infinity;

    for (let i = 0; i < data.list.length; i++) {
      const temp = data.list[i].main.temp;
      const tempDate = new Date(data.list[i].dt_txt);

      if (tempDate.getDate() === date.getDate()) {
        if (temp < minTemp) {
          minTemp = temp;
        }
        if (temp > maxTemp) {
          maxTemp = temp;
        }
      }
    }

    const description = item.weather[0].description;

    return { dayOfWeek, weatherIcon, minTemp, maxTemp, description };
  });
  return forecastData;
};

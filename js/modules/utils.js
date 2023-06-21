export const leadingZero = (n) => (n < 10 ? `0${n}` : n);

export const getCurrentDateTime = () => {
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

  const currentDate = new Date();

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  const currentWeekDay = weekDays[currentDate.getDay()];

  const hours = leadingZero(currentDate.getHours());
  const minutes = leadingZero(currentDate.getMinutes());

  return {
    currentDate,
    currentDayOfMonth,
    currentMonth,
    currentYear,
    currentWeekDay,
    hours,
    minutes,
  };
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

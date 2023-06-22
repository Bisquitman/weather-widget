# MethED - Интенсив - Виджет погоды (20.06.2023 — 23.06.2023)

## ЧТО БУДЕМ ДЕЛАТЬ

- Напишем современный код на JavaScript (ES6 и выше);

- Поработаем с функциями, циклами и условиями;

- Поработаем с API;

- Используем Fetch API для выполнения HTTP-запросов и получения данных с сервера;

- Используем JSON для обмена данными с API;

- Поработаем с DOM (Document Object Model);

- Используем асинхронность и обработку ошибок;

- Обработка изображений;

- Поработаем с датой и временем;

- Немного математических операций

- Поработаем с HTML и выводом данных на странице;

- Использование IP-геолокации;

- и многое другое.

---

## Полезные ссылки

- [Исходники (верстка)](https://fs09.getcourse.ru/fileservice/file/download/a/251231/sc/424/h/e23d0dab7c92de164a16e281b6eddedd.zip)
- [Git](https://git-scm.com/)
- [API openweathermap](https://openweathermap.org/)
- [Arrows](https://symbl.cc/ru/unicode/blocks/arrows/)
- BugFix проблемы с ежедневным прогнозом: 
  в функции getWeatherForecastData добавить
  const currentDate = new Date();
  const dateUTC = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);
  и заменить new Date().getDate() на dateUTC.getDate()
  тогда всегда будет 5 дней вне зависимости от часового пояса.
import { startWidget } from './widgetService.js';

export const cityServiceSearch = (widget) => {
  const button = widget.querySelector('.widget__change-city');

  button.addEventListener('click', (e) => {
    const form = document.createElement('form');
    form.className = 'widget__form';

    const inputCity = document.createElement('input');
    inputCity.className = 'widget__input';
    inputCity.name = 'city';
    inputCity.type = 'search';
    inputCity.placeholder = 'Введите город';

    form.append(inputCity);
    widget.append(form);
    inputCity.focus();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      widget.textContent = '';
      await startWidget(inputCity.value, widget);
      cityServiceSearch(widget);
    });

    inputCity.addEventListener('keyup', ({ code }) => {
      if (code === 'Escape') {
        form.remove();
      }
    });
  });
};

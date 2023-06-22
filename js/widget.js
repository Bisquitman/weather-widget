import { startWidget } from './modules/widgetService.js';

const initWidget = async (app) => {
  app.innerHTML = `
    <div class="weather__loading">
      <img src="./icon/loading.gif" alt="Loading...">
    </div>
  `;
  const widget = await startWidget();
  app.textContent = '';
  app.append(widget);
};

initWidget(document.getElementById('app'));

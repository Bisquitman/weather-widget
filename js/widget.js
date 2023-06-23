import { startWidget } from './modules/widgetService.js';

const initWidget = async (app) => {
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = 'widget.css';
  document.head.append(cssLink);

  const widget = await startWidget();
  app.append(widget);
};

initWidget(document.querySelector('#app'));

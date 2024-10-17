import Chart from 'chart.js';

import GaugeController from './controllers/controller.gauge';

import polyfill from './polyfill';

polyfill();

Chart.controllers.gauge = GaugeController;
Chart.Gauge = (context, config) => {
  config.type = 'gauge';

  return new Chart(context, config);
};

export default Chart.Gauge;

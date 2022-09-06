import schedule from 'node-schedule';
import { sendLunch } from './work/lunch.js';
import { sendStock, makeChart, sendChart } from './work/stock.js';


const sendLunchWork = schedule.scheduleJob('0 0 11 * * MON-FRI', async () => {
  sendLunch();
});
const sendStockgWork = schedule.scheduleJob('0 0 9-16 * * MON-FRI', async () => {
  sendStock();
});
const makeChartWork = schedule.scheduleJob('0 1 16 * * FRI', async () => {
  makeChart();
});
const sendChartWork = schedule.scheduleJob('0 2 16 * * FRI', async () => {
  sendChart();
});

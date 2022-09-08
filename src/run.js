import cron from 'node-cron';
import { sendLunch } from './work/lunch.js';
import { sendStock, makeChart, sendChart } from './work/stock.js';

const sendLunchWork = cron.schedule('0 0 11 * * 1-5', async () => {
  await sendLunch();
});
const sendStockgWork = cron.schedule('0 0 9-16 * * 1-5', async () => {
  await sendStock();
});
const makeChartWork = cron.schedule('0 1 16 * * 5', async () => {
  await makeChart();
});
const sendChartWork = cron.schedule('0 2 16 * * 5', async () => {
  await sendChart();
});

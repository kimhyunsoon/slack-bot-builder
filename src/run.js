import cron from 'node-cron';
import { sendLunch } from './work/lunch.js';
import { sendStock, makeChart, sendChart } from './work/stock.js';
import moment from 'moment';

const days = ['일', '월', '화', '수', '목', '금', '토'];
const log = {
  error: async (msg) => {
    let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    console.error(`#error::${date} ${days[moment().day()]}요일 [ ${msg} ]`);
  },
  info: async (msg) => {
    let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    console.log(`#info::${date} ${days[moment().day()]}요일 [ ${msg} ]`);
  }
};


const sendLunchWork = cron.schedule('0 0 11 * * MON-FRI', async () => {
  await sendLunch();
});
const sendStockgWork = cron.schedule('0 0 9-16 * * MON-FRI', async () => {
  await sendStock();
});
const makeChartWork = cron.schedule('0 1 16 * * FRI', async () => {
  await makeChart();
});
const sendChartWork = cron.schedule('0 2 16 * * FRI', async () => {
  await sendChart();
});

const test = cron.schedule('0 * 9-16 * * MON-FRI', async () => {
  await log.info('test');
  await sendStock();
});

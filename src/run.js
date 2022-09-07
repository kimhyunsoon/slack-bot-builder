import schedule from 'node-schedule';
import { sendLunch } from './work/lunch.js';
import { sendStock, makeChart, sendChart } from './work/stock.js';
import moment from 'moment';


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

const test = schedule.scheduleJob('0 * 9-16 * * MON-FRI', async () => {
  const log = {
    error: (msg) => {
      let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      console.error(`#error::${date} ${days[moment().day()]}요일 [ ${msg} ]`);
    },
    info: (msg) => {
      let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      console.log(`#info::${date} ${days[moment().day()]}요일 [ ${msg} ]`);
    }
  };
  log.info('test');
});


import { WebClient } from '@slack/web-api';
import slack from '../config/slack-key.js';
import { lunchArray } from '../data/data.js';

import moment from 'moment';

const web = new WebClient(slack.lunch.bot_token);

const days = ['일', '월', '화', '수', '목', '금', '토'];

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

const rand = (max) => {
  return Math.floor(Math.random() * (max - 1));
}

let lastNumbers = [];

const getLastNumbers = async () => {
  lastNumbers = [];
  const history = await getHistory();
  const filter = history.messages.filter((r) => r.bot_id === slack.lunch.bot_id)
    .slice(0, 10).reduce((acc, r) => {
      acc.push(r.text.split('\n')[1].split(' / ')[0]);
      return acc;
    }, []);
  
  lunchArray.forEach((r, i) => {
    if (filter.indexOf(r.name) !== -1) lastNumbers.push(i);  
  })
}

const getNumber = () => {
  const num = rand(lunchArray.length);
  if (lastNumbers.indexOf(num) !== -1) return getNumber();
  return num;
}
const getMenu = async () => {
  await getLastNumbers();
  const num = await getNumber();
  return lunchArray[num];
}

const getHistory = async () => {
  const history = await web.conversations.history({
    channel: slack.lunch.channel,
  });
  return history;
}

const sendLunch = async () => {
  const menu = await getMenu();
  const date = `${moment(new Date()).format('MM월 DD일')} ${days[moment().day()]}요일`;
  web.chat.postMessage({
    channel: slack.lunch.channel,
    text: `${date} 추천 메뉴는 '${menu.category}' 입니다.\n${menu.name} / ${menu.location}(${menu.far}m)`,
    as_user: true
  });
  log.info(`${menu.name} / ${menu.category} / ${menu.location}(${menu.far})`);
}

export {
  sendLunch,
}

/* eslint-disable no-console */
const axios = require('axios').default;
const articlesModel = require('../../models/articlesModel');

async function fetchData() {
  const url = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=20';
  const { data } = await axios.get(url);
  await articlesModel.upsertManyArticles(data);
  console.log(`LOG: Atualização de database: ${new Date().toLocaleString('pt-br')}`);
}

function hourInMilliseconds(hour) {
  return hour * 60 * 60 * 1000;
}

async function seedDataBaseRoutine() {
  try {
    const dayInMs = hourInMilliseconds(24);
    const dailyRunTimeTaskInMs = hourInMilliseconds(9);
    const serverStartDate = new Date();
    const endOfDayDate = new Date();
    endOfDayDate.setHours(23, 59, 59, 999);
    const startHourDate = new Date();
    startHourDate.setHours(9, 0, 0, 0);

    // firstTime until 9am next day - if server starts after 9am
    const startMsAfter = endOfDayDate - serverStartDate + dailyRunTimeTaskInMs;
    // firstTime until 9am next day - if server starts before 9am
    const startMsBefore = startHourDate - serverStartDate;
    const firstSleepTimeMS = (startMsBefore > 0) ? startMsBefore : startMsAfter;

    setTimeout(async () => {
      fetchData();

      // interval will execute new fetch every day at 9am
      setInterval(() => fetchData(), dayInMs);
    }, firstSleepTimeMS);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { seedDataBaseRoutine };

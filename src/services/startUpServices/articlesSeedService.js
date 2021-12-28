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
    const startTime = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // firstTime until 9am next day
    const firstSleepTimeMS = endOfDay - startTime + dailyRunTimeTaskInMs;

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

/* eslint-disable no-console */

require('dotenv/config');
const axios = require('axios').default;
const articlesModel = require('../../models/articlesModel');

async function seedDatabase() {
  try {
    const url = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=100';
    console.error('Creating Seed...'
        + '\nFetching data from spaceflightnewsapi...');
    const { data } = await axios.get(url);
    console.log('Data found...'
        + '\nSavind Seed on DataBase...');
    const clearDB = await articlesModel.deleteAllData();
    const insertData = await articlesModel.putManyArticles(data);
    if (!insertData || !clearDB) throw new Error('Something wrong happened when Seed was running');
    console.log(`Total of documents saved for this project: ${insertData.insertedCount}`
        + '\nDataBase seeded! enjoy');
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit(1);
  }
}

seedDatabase();

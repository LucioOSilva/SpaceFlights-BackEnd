/* eslint-disable no-console */

require('dotenv/config');
const axios = require('axios').default;
const articlesModel = require('../../models/articlesModel');

async function seedDatabase() {
  try {
    const url = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=100';
    console.log('Creating Seed...');
    console.log('Fetching data from spaceflightnewsapi...');
    const { data } = await axios.get(url);
    console.log('Data found...');
    console.log('Savind Seed on DataBase...');
    const response = await articlesModel.putManyArticles(data);
    if (!response) throw new Error('Something wrong happened when Seed was running');
    console.log(`Total of documents saved for this project: ${response.insertedCount}`);
    console.log('DataBase seeded! enjoy');
  } catch (error) {
    console.log(error.message);
  } finally {
    process.exit(1);
  }
}

seedDatabase();

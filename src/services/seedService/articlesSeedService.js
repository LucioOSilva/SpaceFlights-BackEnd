/* eslint-disable no-console */
require('dotenv/config');
const axios = require('axios').default;
const { objectResponse, statusCode } = require('../statusResponse');
const articlesModel = require('../../models/articlesModel');

async function seedDatabase() {
  try {
    const url = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=2';

    console.log('Creating Seed...');
    console.log('Fetching data from spaceflightnewsapi...');
    const { data } = await axios.get(url);
    console.log('Data found...');
    console.log('Savind Seed on DataBase...');
    const response = await articlesModel.putManyArticles(data);
    if (!response) throw new Error('Something wrong happened when Seed was running');
    console.log(response);
    console.log('DataBase seeded!');
  } catch (error) {
    return objectResponse(statusCode.internalServerError, `Error: ${error.message}`);
  }
}

module.exports = {
  seedDatabase,
};

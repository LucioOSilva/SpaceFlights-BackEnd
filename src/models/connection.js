require('dotenv/config');
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGOCONNECTION_LOCAL = 'mongodb://localhost:27017/';
const { MONGOCONNECTION } = process.env;
const { MONGODB_NAME } = process.env;

const connection = () => MongoClient.connect(MONGOCONNECTION || MONGOCONNECTION_LOCAL, OPTIONS)
  .then((conn) => conn.db(MONGODB_NAME || 'ArticlesTest'))
  .catch((err) => { console.error(err); return { status: 500, message: 'Impossible to access DB' }; });

module.exports = connection;

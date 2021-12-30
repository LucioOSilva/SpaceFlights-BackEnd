const { MongoClient } = require('mongodb');
const chaiHttp = require('chai-http');
const {
  describe,
  before,
  after,
  it,
} = require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const { getConnection } = require('../mongoMockConnection');
const server = require('../../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('GET "/"', () => {
  let connectionMock;
  let response;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    response = await chai.request(server).get('/');
  });

  after(async () => {
    connectionMock.db('test').collection('ArticlesTest').drop();
    MongoClient.connect.restore();
  });

  describe('Executa o handShake', () => {
    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedades "status", "message" e "data"', () => {
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('message');
      expect(response.body).to.have.property('data');
    });

    it('a propriedade "message" possui o texto "Fullstack Challenge 2021..."', () => {
      expect(response.body.message)
        .to.be.equal('Fullstack Challenge 2021 🏅 - Space Flight News');
    });
  });
});

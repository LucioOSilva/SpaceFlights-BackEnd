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

describe('Teste na rota -> [GET] "/"', () => {
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

  describe('Verifica de um handShake é executado', () => {
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

describe('Teste nas rotas -> [POST] "/articles" e [GET] "/articles/{id}"', () => {
  let connectionMock;
  let response;
  let anotherResponse;
  const articleToPost = {
    title: 'To the Moon',
    url: 'https://moon.nasa.gov/',
    imageUrl: 'https://i.imgur.com/FEuPD4T.jpeg',
    newsSite: 'Showing the red moon',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat maximus...',
    launches: [
      {
        id: 'b4cb5f4f-247d-4a14-918a-a2e56f46249e',
        provider: 'Launch Library X',
      },
    ],
    events: [],
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    response = await chai.request(server).post('/articles').send(articleToPost);
    anotherResponse = await chai.request(server).get(`/articles/${response.body.data.id}`).send(articleToPost);
  });

  after(async () => {
    connectionMock.db('test').collection('ArticlesTest').drop();
    MongoClient.connect.restore();
  });

  describe('Verifica [POST] postagem de um artigo que deverá ser salvo na base', () => {
    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedades "status", "message" e "data"', () => {
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('message');
      expect(response.body).to.have.property('data');
    });

    it('a propriedade "message" deve ser "null"', () => {
      expect(response.body.message)
        .to.be.equal(null);
    });

    it('a propriedade data deve ter uma propriedade "id" que se refere ao objeto postado', () => {
      expect(response.body.data).to.have.property('id');
    });
  });

  describe('Verifica [GET] retornando objeto postado', () => {
    it('retorna o código de status 200', () => {
      expect(anotherResponse).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedades "status", "message" e "data"', () => {
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('message');
      expect(response.body).to.have.property('data');
    });

    it('a propriedade "message" deve ser "null"', () => {
      expect(response.body.message)
        .to.be.equal(null);
    });

    it('a propriedade data deve ter uma propriedade "title" com o texto "To the Moon"', () => {
      expect(anotherResponse.body.data.title).to.be.equal('To the Moon');
    });
  });
});

describe('Teste na rota -> [GET] "/articles"', () => {
  let connectionMock;
  let response;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    response = await chai.request(server).get('/articles');
  });

  after(async () => {
    connectionMock.db('test').collection('ArticlesTest').drop();
    MongoClient.connect.restore();
  });

  describe('Verifica listagem dos artigos publicados sem passar "page" como "queryparam"', () => {
    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedades "status", "message" e "data"', () => {
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('message');
      expect(response.body).to.have.property('data');
    });

    it('a propriedade "data" deve ser "null"', () => {
      expect(response.body.data)
        .to.be.equal(null);
    });

    it('a propriedade "message" deve ser "You must pass a queryparam..."', () => {
      expect(response.body.message)
        .to.contains('You must pass a queryparam');
    });
  });
});
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

  describe('Verifica [GET] listagem dos artigos publicados sem passar "page" como "queryparam"', () => {
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

describe('Teste nas rotas -> [PUT] "/articles" e [GET] "/articles?page=1"', () => {
  let connectionMock;
  let response;
  let anotherResponse;
  let articlesResponse;
  const articleToPost = {
    title: 'Arianespace flight ST37',
    url: 'https://www.arianespace.com/',
    imageUrl: 'https://i.imgur.com/k6GZzDO.jpeg',
    newsSite: 'Arianespace - Mission to success',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat maximus...',
    launches: [],
    events: [],
  };
  const putObject = { title: 'The new mission of Arianespace' };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    response = await chai.request(server).post('/articles').send(articleToPost);
    anotherResponse = await chai.request(server).put(`/articles/${response.body.data.id}`).send(putObject);
    articlesResponse = await chai.request(server).get('/articles?page=1');
  });

  after(async () => {
    connectionMock.db('test').collection('ArticlesTest').drop();
    MongoClient.connect.restore();
  });

  describe('Verifica [PUT] se objeto retornado é objeto com título alterado', () => {
    it('retorna o código de status 200', () => {
      expect(anotherResponse).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(anotherResponse.body).to.be.a('object');
    });

    it('o objeto possui a propriedades "status", "message" e "data"', () => {
      expect(anotherResponse.body).to.have.property('status');
      expect(anotherResponse.body).to.have.property('message');
      expect(anotherResponse.body).to.have.property('data');
    });

    it('a propriedade "message" deve ser "null"', () => {
      expect(anotherResponse.body.message)
        .to.be.equal(null);
    });

    it('a propriedade data deve ter uma propriedade "id" que se refere ao objeto atualizado', () => {
      expect(anotherResponse.body.data).to.have.property('id');
    });

    it('a propriedade "id" deve conter um id do tipo numero', () => {
      expect(anotherResponse.body.data.id).to.be.a('number');
    });
  });

  describe('Verifica [GET] se listagem de artigos é retornada', () => {
    it('retorna o código de status 200', () => {
      expect(articlesResponse).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(articlesResponse.body).to.be.a('object');
    });

    it('o objeto possui a propriedades "status", "message" e "data"', () => {
      expect(articlesResponse.body).to.have.property('status');
      expect(articlesResponse.body).to.have.property('message');
      expect(articlesResponse.body).to.have.property('data');
    });

    it('a propriedade "message" deve ser "null"', () => {
      expect(articlesResponse.body.message)
        .to.be.equal(null);
    });

    it('a propriedade data deve ter um array de artigos retornados e numeração de paginas', () => {
      expect(articlesResponse.body.data).to.have.property('articles');
      expect(articlesResponse.body.data).to.have.property('pages');
    });

    it('o array de artigos retornados deve ter comprimento de tamanho 1', () => {
      expect(articlesResponse.body.data.articles.length).to.be.equal(1);
    });

    it('verifica se a paginação retornada contém "pageSelected" e "lastPage"', () => {
      expect(articlesResponse.body.data.pages).to.have.property('pageSelected');
      expect(articlesResponse.body.data.pages).to.have.property('lastPage');
    });

    it('verifica se a paginação retornada em "pageSelected" e "lastPage" está correta', () => {
      expect(articlesResponse.body.data.pages.pageSelected).to.be.equal(1);
      expect(articlesResponse.body.data.pages.lastPage).to.be.equal(1);
    });
  });
});

describe('Teste nas rotas -> [DELETE] "/articles" e [GET] "/articles?page=1"', () => {
  let connectionMock;
  let response;
  let deleteResponse;
  const articleToPost = {
    title: 'Esa new missions',
    url: 'https://www.esa.int/',
    imageUrl: 'https://i.imgur.com/3MAEcxw.jpeg',
    newsSite: 'atlantis mission',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat maximus...',
    launches: [],
    events: [],
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    response = await chai.request(server).post('/articles').send(articleToPost);
    deleteResponse = await chai.request(server).delete(`/articles/${response.body.data.id}`);
  });

  after(async () => {
    connectionMock.db('test').collection('ArticlesTest').drop();
    MongoClient.connect.restore();
  });

  describe('Verifica [DELETE] se objeto retornado é objeto com título alterado', () => {
    it('retorna o código de status 200', () => {
      expect(deleteResponse).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(deleteResponse.body).to.be.a('object');
    });

    it('o objeto possui a propriedades "status", "message" e "data"', () => {
      expect(deleteResponse.body).to.have.property('status');
      expect(deleteResponse.body).to.have.property('message');
      expect(deleteResponse.body).to.have.property('data');
    });

    it('a propriedade "message" deve ser "null"', () => {
      expect(deleteResponse.body.message)
        .to.be.equal(null);
    });

    it('a propriedade data deve ter uma propriedade "deleted" que se refere ao objeto deletado', () => {
      expect(deleteResponse.body.data).to.have.property('deleted');
    });

    it('a propriedade "deleted" deve ser do tipo boolean', () => {
      expect(deleteResponse.body.data.deleted).to.be.a('boolean');
    });
  });
});

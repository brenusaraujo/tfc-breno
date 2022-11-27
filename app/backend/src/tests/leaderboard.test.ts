import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import sequelize from '../database/models';

import leaderboard from './expected_results/leaderboard';
import leaderboardHome from './expected_results/leaderboardHome';
import leaderboardAway from './expected_results/leaderboardAway';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota de teams "/leaderboard"', () => {
  describe('quando a requisição é feita com sucesso', () => {
    beforeEach(() => sinon.stub(sequelize, 'query').resolves([leaderboard] as any));
    afterEach(sinon.restore);

    it('deve retornar um status "200" com a tabela atualizada', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard');

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(leaderboard);
    });
  });
});

describe('Teste da rota de teams "/leaderboard/home"', () => {
  describe('quando a requisição é feita com sucesso', () => {
    beforeEach(() => sinon.stub(sequelize, 'query').resolves([leaderboardHome] as any));
    afterEach(sinon.restore);

    it('deve retornar um status "200" com a tabela atualizada dos times da casa', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard/home');

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(leaderboardHome);
    });
  });
});

describe('Teste da rota de teams "/leaderboard/away"', () => {
  describe('quando a requisição é feita com sucesso', () => {
    beforeEach(() => sinon.stub(sequelize, 'query').resolves([leaderboardAway] as any));
    afterEach(sinon.restore);

    it('deve retornar um status "200" com a tabela atualizada dos times visitantes', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard/away');

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(leaderboardAway);
    });
  });
});


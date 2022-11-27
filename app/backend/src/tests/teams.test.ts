import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teams from './expected_results/teams';

import Teams from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota de teams "/teams"', () => {
  describe('quando a requisição é feita com sucesso', () => {
    beforeEach(() => sinon.stub(Teams, 'findAll').resolves(teams as any));
    afterEach(sinon.restore);

    it('deve retornar um status "200" cotendo todos os times', async () => {
      const httpResponse = await chai.request(app).get('/teams');

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(teams);
    });
  });
});

describe('Teste da rota de teams "/teams/:id"', () => {
  describe('quando a requisição falha', () => {
    beforeEach(() => sinon.stub(Teams, 'findByPk').resolves(null));
    afterEach(sinon.restore);

    it('deve retornar um status "404" com a mensagem de erro', async () => {
      const httpResponse = await chai.request(app).get('/teams/20');

      expect(httpResponse.status).to.be.equal(404);
      expect(httpResponse.body).to.deep.equal({ message: 'There is no team with such id!' });
    });
  });

  describe('quando a requisição é feita com sucesso', () => {
    beforeEach(() => sinon.stub(Teams, 'findByPk').resolves(teams[0] as any));
    afterEach(sinon.restore);

    it('deve retornar um status "200" com o time encontrado', async () => {
      const httpResponse = await chai.request(app).get('/teams/1');

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(teams[0]);
    });
  });
});


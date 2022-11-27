import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

import tokenFunction from '../helpers/generateToken';
import * as bcrypt from 'bcryptjs';

import Users from '../database/models/UsersModel';

import matches from './expected_results/matches';
import matchesInProgress from './expected_results/matchesInProgress';
import matchCreated from './expected_results/matchCreated';
import teams from './expected_results/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota de matches "/matches"', () => {
  describe('quando a requisição falha', () => {
    it('deve retornar um erro com status "404" ao tentar criar uma partida com time inválido', async () => {
      sinon.stub(Users, 'findOne').resolves({ email: 'admin@admin.com', password: 'secrect_admin'} as any);
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(tokenFunction, 'generateToken').resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY2NjEwOTczfQ.TLub2yP8JKI7NsJZkCul9AwXBpZNKoreHDcnazrY8S8')
      sinon.stub(Teams, 'findByPk').onFirstCall().resolves(null).onSecondCall().resolves(teams[7] as any);

      const httpResponseLogin = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      const { token } = httpResponseLogin.body;

      const httpResponse = await chai.request(app).post('/matches').send({
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      }).set('Authorization', token);

      expect(httpResponse.status).to.be.equal(404);
      expect(httpResponse.body).to.deep.equal({ message: 'There is no team with such id!' });

      sinon.restore();
    });

    it('deve retornar um erro com status "422" ao tentar criar uma partida com os times iguais', async () => {
      sinon.stub(Users, 'findOne').resolves({ email: 'admin@admin.com', password: 'secrect_admin'} as any);
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(tokenFunction, 'generateToken').resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY2NjEwOTczfQ.TLub2yP8JKI7NsJZkCul9AwXBpZNKoreHDcnazrY8S8')
      sinon.stub(Teams, 'findByPk').onFirstCall().resolves(teams[7] as any).onSecondCall().resolves(teams[7] as any);

      const httpResponseLogin = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      const { token } = httpResponseLogin.body;

      const httpResponse = await chai.request(app).post('/matches').send({
        homeTeam: 8,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      }).set('Authorization', token);


      expect(httpResponse.status).to.be.equal(422);
      expect(httpResponse.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });

      sinon.restore();
    });
  })

  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status "200" contendo todas as partidas', async () => {
      sinon.stub(Matches, 'findAll').resolves(matches as any)

      const httpResponse = await chai.request(app).get('/matches');

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(matches);

      sinon.restore();
    });

    it('deve retornar a partida inserida no banco de dados', async () => {
      sinon.stub(Users, 'findOne').resolves({ email: 'admin@admin.com', password: 'secrect_admin'} as any);
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(tokenFunction, 'generateToken').resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY2NjEwOTczfQ.TLub2yP8JKI7NsJZkCul9AwXBpZNKoreHDcnazrY8S8')
      sinon.stub(Teams, 'findByPk').onFirstCall().resolves(teams[15] as any).onSecondCall().resolves(teams[7] as any);
      sinon.stub(Matches, 'create').resolves(matchCreated as any)

      const httpResponseLogin = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      const { token } = httpResponseLogin.body;

      const httpResponse = await chai.request(app).post('/matches').send({
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      }).set('Authorization', token);

      expect(httpResponse.status).to.be.equal(201);
      expect(httpResponse.body).to.deep.equal(matchCreated);

      sinon.restore();
    });
  });
});

describe('Teste da rota de matches "/matches?inProgress=true"', () => {
  describe('quando a requisição é feita com sucesso', () => {
    beforeEach(() => sinon.stub(Matches, 'findAll').resolves(matchesInProgress as any));
    afterEach(sinon.restore);

    it('deve retornar um status "200" contendo todas as partidas em progresso', async () => {
      const httpResponse = await chai.request(app).get('/matches?inProgress=true');

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(matchesInProgress);
    });
  });
});

describe('Teste da rota de matches "/matches/:id"', () => {
  describe('quando a requisição é feita com sucesso', () => {
    beforeEach(() => sinon.stub(Matches, 'update').resolves(null as any));
    afterEach(sinon.restore);

    it('deve retornar um status "200" e uma mensagem quando a partida é atualizada', async () => {
      const httpResponse = await chai.request(app).patch('/matches/2');

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal({ message: 'Updated match' });
    });
  });
});

describe('Teste da rota de matches "/matches/:id/finish"', () => {
  describe('quando a requisição é feita com sucesso', () => {
    beforeEach(() => sinon.stub(Matches, 'update').resolves(null as any));
    afterEach(sinon.restore);

    it('deve retornar um status "200" e uma mensagem quando a partida é finalizada', async () => {
      const httpResponse = await chai.request(app).patch('/matches/2/finish');

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal({ message: 'Finished' });
    });
  });
});


import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App, app } from '../app';

import LoginService from '../services/LoginService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota básica "/"', () => {
  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar uma messagem de "ok"', async () => {
      const httpResponse = await chai.request(app).get('/');
      expect(httpResponse.body).to.deep.equal({ ok: true });
    });
  });
});

describe('Teste do middleware de erro', () => {
  it('deve retornar um erro com o status "500"', async () => {
    sinon.stub(LoginService.prototype, 'login').rejects();

    const httpResponse = await chai.request(app).post('/login').send({
      email: 'email@email.com',
      password: 'aisndasdunasd',
    });
    expect(httpResponse.status).to.be.equal(500);

    sinon.restore();
  });
});

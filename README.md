
# ⚽ Trybe Futebol Clube

O TFC é um site informativo sobre partidas e classificações de futebol!

![tfc](https://user-images.githubusercontent.com/99822908/197893222-e9b8bf64-e6cb-415d-b273-ff045ff426cd.png)


## 🔎 Documentação da API

#### Login

```
  POST /login 
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Seu email. |
| `password` | `string` | **Obrigatório**. Sua senha. |

#### Validação de Login

```
  GET /login/validate
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `string` | **Obrigatório**. Token do login deve ser passado no header. |

#### Times

```
  GET /teams
```

```
  GET /teams/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. Id do time deve ser passado pelo parâmetro da URL. |

#### Partidas

```
  GET /matches
```

```
  GET /matches?inProgress=true
```

```
  GET /matches?inProgress=false
```

```
  POST /matches
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `homeTeam` | `number` | **Obrigatório**. Id do time da casa. |
| `awayTeam` | `number` | **Obrigatório**. Id do time visitante. |
| `homeTeamGoals` | `number` | **Obrigatório**. Número de gols do time da casa. |
| `awayTeamGoals` | `number` | **Obrigatório**. Número de gols do time visitante. |
| `Authorization`      | `string` | **Obrigatório**. Token do login deve ser passado no header. |

```
  PATCH /matches/:id/finish
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. Id da partida deve ser passada pelo parâmetro da URL. |

```
  PATCH /matches/:id/
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. Id da partida deve ser passada pelo parâmetro da URL. |
| `homeTeamGoals` | `number` | **Obrigatório**. Número de gols do time da casa. |
| `awayTeamGoals` | `number` | **Obrigatório**. Número de gols do time visitante. |

#### Tabela de Classificação

```
  GET /leaderboard/home
```

```
  GET /leaderboard/away
```

```
  GET /leaderboard
```

## 👨🏻‍💻 Habilidades

- Realização da dockerização dos apps, network, volume e compose;
- Modelagem de dados com MySQL através do Sequelize;
- Criação e associação de tabelas usando models do sequelize;
- Construção de uma API REST com endpoints para consumir os models criados;
- Construção de um CRUD com TypeScript, utilizando ORM;
- Validar dados das requisições com a biblioteca Joi.
- Implementar testes de integração com Mocha, Chai e Sinon.

## 🧪 Executando os testes

Entre na pasta do backend ```cd app/backend```

```
npm run test
```

![Captura de tela de 2022-10-26 10-52-53](https://user-images.githubusercontent.com/99822908/198052383-4fcb9b71-4147-48a2-ae1d-74495e34c93d.png)

Testes de cobertura:

```
npm run test:coverage
```

![Captura de tela de 2022-10-25 19-09-31](https://user-images.githubusercontent.com/99822908/198052434-3084e8f0-3609-4a8a-b8f7-b015cd7308f4.png)


## 🛠️ Ferramentas & Metodologias Utilizadas

- [Node.js](https://nodejs.org/en/);
- [Express.js](https://expressjs.com/);
- [MySQL](https://www.mysql.com/);
- [mysql2](https://www.npmjs.com/package/mysql2);
- [Sequelize(ORM)](https://sequelize.org/);
- [JWT(Autenticação)](https://jwt.io/);
- [bcrypt.js](https://github.com/kelektiv/node.bcrypt.js#readme);
- [Joi](https://joi.dev/api/?v=17.6.0);
- [Docker](https://www.docker.com/);
- [TypeScript](https://www.typescriptlang.org/);
- [Mocha](https://mochajs.org/);
- [Chai](https://www.chaijs.com/);
- [Sinon.js](https://sinonjs.org/);

---
⌨️ desenvolvido por [Breno Araújo](https://www.linkedin.com/in/brenusaraujo/) 🇧🇷


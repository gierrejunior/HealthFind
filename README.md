<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


# Prisma Studio

```
yarn prisma studio
```

### can login with email or Username


# Check list endpoints:

### User

- [x] Post ```baseUrl```/registration
- [x] Get ```baseUrl```/users
- [x] Get ```baseUrl```/users/:id
- [x] Put ```baseUrl```/users/:id
- [x] Delete ```baseUrl```/users/:id
- [x] Post ```baseUrl```/login


### Health Units:

- [x] POST ```baseUrl```/health-units
- [x] GET ```baseUrl```/health-units
- [x] GET ```baseUrl```/health-units/:id
- [ ] PUT ```baseUrl```/health-units/:id
- [x] DELETE ```baseUrl```/health-units/:id
  
### Health Areas:

- [ ] POST ```baseUrl```/health-areas
- [ ] GET ```baseUrl```/health-areas
- [ ] GET ```baseUrl```/health-areas/:id
- [ ] PUT ```baseUrl```/health-areas/:id
- [ ] DELETE ```baseUrl```/health-areas/:id
  
### Health Teams:

- [ ] POST ```baseUrl```/health-teams
- [ ] GET ```baseUrl```/health-teams
- [ ] GET ```baseUrl```/health-teams/:id
- [ ] PUT ```baseUrl```/health-teams/:id
- [ ] DELETE ```baseUrl```/health-teams/:id
  
### Health Team Areas:

- [ ] POST ```baseUrl```/health-team-areas
- [ ] GET ```baseUrl```/health-team-areas
- [ ] GET ```baseUrl```/health-team-areas/:id
- [ ] PUT ```baseUrl```/health-team-areas/:id
- [ ] DELETE ```baseUrl```/health-team-areas/:id
  
### Nurses:

- [ ] POST ```baseUrl```/nurses
- [ ] GET ```baseUrl```/nurses
- [ ] GET ```baseUrl```/nurses/:id
- [ ] PUT ```baseUrl```/nurses/:id
- [ ] DELETE ```baseUrl```/nurses/:id

### Doctors:

- [ ] POST ```baseUrl```/doctors
- [ ] GET ```baseUrl```/doctors
- [ ] GET ```baseUrl```/doctors/:id
- [ ] PUT ```baseUrl```/doctors/:id
- [ ] DELETE ```baseUrl```/doctors/:id
  
### Nursing Technicians:

- [ ] POST ```baseUrl```/nursing-technicians
- [ ] GET ```baseUrl```/nursing-technicians
- [ ] GET ```baseUrl```/nursing-technicians/:id
- [ ] PUT ```baseUrl```/nursing-technicians/:id
- [ ] DELETE ```baseUrl```/nursing-technicians/:id
  
### Dentists:

- [ ] POST ```baseUrl```/dentists
- [ ] GET ```baseUrl```/dentists
- [ ] GET ```baseUrl```/dentists/:id
- [ ] PUT ```baseUrl```/dentists/:id
- [ ] DELETE ```baseUrl```/dentists/:id
  
### Health Agents:

- [ ] POST ```baseUrl```/health-agents
- [ ] GET ```baseUrl```/health-agents
- [ ] GET ```baseUrl```/health-agents/:id
- [ ] PUT ```baseUrl```/health-agents/:id
- [ ] DELETE ```baseUrl```/health-agents/:id
  
### MicroAreas:

- [ ] POST ```baseUrl```/micro-areas
- [ ] GET ```baseUrl```/micro-areas
- [ ] GET ```baseUrl```/micro-areas/:id
- [ ] PUT ```baseUrl```/micro-areas/:id
- [ ] DELETE ```baseUrl```/micro-areas/:id
  
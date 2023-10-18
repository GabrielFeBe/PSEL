import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestModule } from './test.module';
import { AccountsService } from '../src/account/account.service';

describe('AppController (e2e), free of auth for Accounts', () => {
  let app: INestApplication;
  const accountService = {
    findOne: () => {
      return {
        id: 1,
        cpf: '42235901468',
        cnpj: null,
        email: 'hu3master.zord@hotmail.com',
        isActive: true,
        name: 'Gabriel',
        lastName: 'Fernandes',
        password: 'aloteste',
      };
    },
    create: () => {
      return {
        id: 1,
        password: 'aloteste',
        name: 'Gabriel',
        lastName: 'Fernandes',
        cpf: '42235901468',
        cnpj: null,
        email: 'hu3master.zord@hotmail.com',
      };
    },
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    })
      .overrideProvider(AccountsService)
      .useValue(accountService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });
  it(`/GET accounts`, () => {
    return request(app.getHttpServer()).get('/accounts').expect(200).expect({
      id: 1,
      cpf: '42235901468',
      cnpj: null,
      email: 'hu3master.zord@hotmail.com',
      isActive: true,
      name: 'Gabriel',
      lastName: 'Fernandes',
      password: '',
    });
  });
  it('/POST accounts with invalid body', () => {
    return request(app.getHttpServer())
      .post('/accounts')
      .send({})
      .expect(400)
      .expect({
        message: [
          'email must be an email',
          'O campo email é obrigatório',
          'password must be longer than or equal to 8 characters',
          'password must be a string',
          'password should not be empty',
          'name must be a string',
          'name should not be empty',
          'lastName must be a string',
          'lastName should not be empty',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
  });
  it('/POST accounts with valid body but an invalid cpf', () => {
    const validBody = {
      email: 'hu3master.zord@hotmail.com',
      cpf: '422',
      password: 'aloteste',
      name: 'Gabriel',
      lastName: 'Fernandes',
    };
    return request(app.getHttpServer())
      .post('/accounts')
      .send(validBody)
      .expect(400)
      .expect({
        message: ['CPF inválido'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });
  it('/POST accounts with valid body but an invalid cnpj', () => {
    const validBody = {
      email: 'hu3master.zord@hotmail.com',
      cnpj: '422',
      password: 'aloteste',
      name: 'Gabriel',
      lastName: 'Fernandes',
    };
    return request(app.getHttpServer())
      .post('/accounts')
      .send(validBody)
      .expect(400)
      .expect({
        message: ['CNPJ inválido'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });
  it('/UPDATE checking if you cant update an invalid email', () => {
    const invalidEmail = {
      email: 'invalidemial',
    };
    return request(app.getHttpServer())
      .patch('/accounts')
      .send(invalidEmail)
      .expect(400)
      .expect({
        message: ['email must be an email'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });
  it('/UPDATE checking if you cant update an invalid password', () => {
    const invalidPassword = {
      password: 'lowk',
    };
    return request(app.getHttpServer())
      .patch('/accounts')
      .send(invalidPassword)
      .expect(400)
      .expect({
        message: ['password must be longer than or equal to 8 characters'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });
  afterAll(async () => {
    await app.close();
  });
});

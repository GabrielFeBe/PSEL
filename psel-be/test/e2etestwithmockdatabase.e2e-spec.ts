import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestModule } from './test.module';

describe('AppController (e2e), free of auth for Accounts and with a mocking db to test if the information stands at the database', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  const validReturnOfDatabase = {
    name: 'Gabriel',
    lastName: 'Fernandes',
    cpf: '42235901468',
    email: 'hu3master.zord@hotmail.com',
    password: 'alotestefunc',
    cnpj: null,
    isActive: true,
  };

  it('/POST accounts with valid stuff', () => {
    const validBody = {
      name: 'Gabriel',
      lastName: 'Fernandes',
      cpf: '42235901468',
      email: 'hu3master.zord@hotmail.com',
      password: 'alotestefunc',
    };
    return request(app.getHttpServer())
      .post('/accounts')
      .send(validBody)
      .expect(201)
      .expect(validReturnOfDatabase);
  });
  it('/POST accounts with valid stuff', () => {
    return request(app.getHttpServer())
      .get('/accounts')
      .expect(200)
      .expect(validReturnOfDatabase);
  });

  afterAll(async () => {
    await app.close();
  });
});

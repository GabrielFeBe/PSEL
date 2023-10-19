import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestModule } from './test.module';
import { createConnection } from 'typeorm';

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
    id: 1,
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
    const data = { ...validReturnOfDatabase, password: '' };
    return request(app.getHttpServer())
      .get('/accounts')
      .expect(200)
      .expect(data);
  });

  afterAll(async () => {
    const connection = await createConnection({
      name: 'default',
      type: 'postgres',
      host: '127.0.0.1', // Use the name of the service from docker-compose.yml
      port: 5433, // default port for postgres
      username: 'postgres',
      password: '102030', // password defined in docker-compose.yml
      synchronize: true,
    });
    const account = 'account';
    const transaction = 'transaction';
    const dropTableQuery = `DROP TABLE IF EXISTS "${account}"; DROP TABLE IF EXISTS "${transaction}"`;

    await connection.query(dropTableQuery);
    connection.close();
    await app.close();
  });
});

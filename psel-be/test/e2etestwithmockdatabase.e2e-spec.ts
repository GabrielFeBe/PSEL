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

  const emailBodyUpdate = {
    email: 'hu4master.zord@hotmail.com',
  };
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

  const validTransactionBody = {
    accountId: 1,
    value: 100,
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

  it('/GET accounts with valid stuff', () => {
    const data = { ...validReturnOfDatabase, password: '' };
    return request(app.getHttpServer())
      .get('/accounts')
      .expect(200)
      .expect(data);
  });

  it('/PATCH accounts', () => {
    const responseReturn = {
      ...validReturnOfDatabase,
      email: emailBodyUpdate.email,
    };
    return request(app.getHttpServer())
      .patch('/accounts')
      .send(emailBodyUpdate)
      .expect(200)
      .expect(responseReturn);
  });

  it('/GET accounts with valid stuff', () => {
    const data = {
      ...validReturnOfDatabase,
      password: '',
      email: emailBodyUpdate.email,
    };
    return request(app.getHttpServer())
      .get('/accounts')
      .expect(200)
      .expect(data);
  });

  it('/PATCH accounts', () => {
    const invalidCpfBody = {
      cpf: 'invalid',
    };
    return request(app.getHttpServer())
      .patch('/accounts')
      .send(invalidCpfBody)
      .expect(400)
      .expect({
        message: 'CPF or CNPJ cannot be updated',
        error: 'Bad Request',
        statusCode: 400,
      });
  });
  it('/POST transactions with valid body', async () => {
    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send(validTransactionBody)
      .expect(201);

    const responseBody = JSON.parse(response.text);

    responseBody.date = new Date(responseBody.date).toISOString().slice(0, 10);

    const expectedResponse = {
      ...validTransactionBody,
      transactionId: 1,
      cashback: '0.02',
      date: responseBody.date,
    };

    expect(responseBody).toEqual(expectedResponse);
  });

  it('/GET Transaction', async () => {
    const response = await request(app.getHttpServer())
      .get('/transactions')
      .expect(200);
    const responseBody = JSON.parse(response.text);
    expect(responseBody).toEqual([
      {
        ...validTransactionBody,
        cashback: '0.02',
        date: responseBody[0].date,
        transactionId: 1,
        value: '100.00',
      },
    ]);
  });
  it('/PATCH transactions', () => {
    return request(app.getHttpServer())
      .patch('/transactions/1')
      .send({ cashback: 0.1 })
      .expect(200)
      .expect('Cahsback added sucessfully');
  });

  it('/GET Transaction after update', async () => {
    const response = await request(app.getHttpServer())
      .get('/transactions')
      .expect(200);
    const responseBody = JSON.parse(response.text);
    expect(responseBody[0].cashback).toEqual('0.10');
  });

  it('/PATCH transactions with invalid body', () => {
    return request(app.getHttpServer())
      .patch('/transactions/1')
      .send({})
      .expect(400)
      .expect({
        message: [
          'cashback must be a number conforming to the specified constraints',
          'cashback must not be empty',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
  });
  it('/PATCH transaction that does not exist', () => {
    return request(app.getHttpServer())
      .patch('/transactions/2')
      .send({ cashback: 0.1 })
      .expect(404)
      .expect({
        message: 'Transaction not found',
        error: 'Not Found',
        statusCode: 404,
      });
  });

  it('/DELETE accounts', () => {
    return request(app.getHttpServer())
      .delete('/accounts')
      .expect(200)
      .expect('Account deleted');
  });

  it('/GET accounts after deleting, so it must be inactive', () => {
    const data = {
      ...validReturnOfDatabase,
      password: '',
      email: emailBodyUpdate.email,
      isActive: false,
    };
    return request(app.getHttpServer())
      .get('/accounts')
      .expect(200)
      .expect(data);
  });

  it('/POST Transactions with a deleted account', () => {
    return request(app.getHttpServer())
      .post('/transactions')
      .send(validTransactionBody)
      .expect(400)
      .expect({
        message: 'Account has been deleted',
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  afterAll(async () => {
    const connection = await createConnection({
      name: 'default',
      type: 'postgres',
      host: '127.0.0.1',
      port: 5433,
      username: 'postgres',
      password: '102030',
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

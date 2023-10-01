import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account/account.entity';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // Use o nome do serviço do Docker Compose para o banco de dados
      port: 5432, // Porta padrão do PostgreSQL
      username: 'postgres',
      password: '102030', // Senha definida no arquivo docker-compose.yml
      entities: [Account, Transaction],
      synchronize: true,
    }),
    TransactionModule,
    AccountModule,
  ],
})
export class AppModule {}

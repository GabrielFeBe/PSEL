import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionsController } from './transaction.controller';
import { TransactionsService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionModule {}
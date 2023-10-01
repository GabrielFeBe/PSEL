import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { TransactionsService } from './transaction.service';
import { ValidationPipe } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { TransactionsDTO } from './transaction.validator';

@Controller('transactions')
@UsePipes(new ValidationPipe())
export class TransactionsController {
  constructor(private readonly appService: TransactionsService) {}

  @Get()
  async getHello(): Promise<Transaction[]> {
    const response = await this.appService.findAll();
    return response;
  }
  // creating a new account;
  @Post()
  async criarExemplo(@Body() requestBody: TransactionsDTO) {
    // 'requestBody' agora contém os dados do corpo da solicitação
    // Faça o processamento necessário com os dados aqui
    console.log(requestBody);
    return 'Exemplo criado com sucesso';
  }
}

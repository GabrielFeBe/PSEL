import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AccountsService } from './account.service';
import { Account } from './account.entity';
import { AccountDto } from './account.validator';
import { ValidationPipe } from '@nestjs/common';

@Controller('accounts')
@UsePipes(new ValidationPipe())
export class AccountsController {
  constructor(private readonly appService: AccountsService) {}

  @Get()
  async getHello(): Promise<Account[]> {
    const response = await this.appService.findAll();
    return response;
  }
  // creating a new account;
  @Post()
  async criarExemplo(@Body() requestBody: AccountDto) {
    // 'requestBody' agora contém os dados do corpo da solicitação
    // Faça o processamento necessário com os dados aqui
    console.log(requestBody);
    return 'Exemplo criado com sucesso';
  }
}

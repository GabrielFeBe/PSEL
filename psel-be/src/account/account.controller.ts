import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './account.service';
import { Account } from './account.entity';

@Controller()
export class AccountsController {
  constructor(private readonly appService: AccountsService) {}

  @Get()
  async getHello(): Promise<Account[]> {
    const response = await this.appService.findAll();
    return response;
  }
  // creating a new account;
  @Post('create')
  async criarExemplo(@Body() requestBody: any) {
    // 'requestBody' agora contém os dados do corpo da solicitação
    // Faça o processamento necessário com os dados aqui
    console.log(requestBody);
    return 'Exemplo criado com sucesso';
  }
}

import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class TransactionsDTO {
  @IsOptional()
  @IsInt({ message: 'O campo transactionId deve ser um número inteiro' })
  transactionId: number;

  @IsNotEmpty({ message: 'O campo accountId é obrigatório' })
  @IsInt({ message: 'O campo accountId deve ser um número inteiro' })
  accountId: number;

  @IsNotEmpty({ message: 'O campo value é obrigatório' })
  @IsInt({ message: 'O campo value deve ser um número inteiro' })
  value: number;
}

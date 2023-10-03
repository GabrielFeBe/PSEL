import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class TransactionsDTO {
  @IsOptional()
  @IsInt({ message: 'O campo transactionId deve ser um número inteiro' })
  transactionId?: number;

  @IsNotEmpty({ message: 'O campo accountId é obrigatório' })
  @IsInt({ message: 'O campo accountId deve ser um número inteiro' })
  accountId: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;
}

import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class TransactionsDTO {
  @IsNotEmpty({ message: 'O campo transactionId é obrigatório' })
  @IsInt({ message: 'O campo transactionId deve ser um número inteiro' })
  transactionId: number;

  @IsNotEmpty({ message: 'O campo accountId é obrigatório' })
  @IsInt({ message: 'O campo accountId deve ser um número inteiro' })
  accountId: number;

  @IsNotEmpty({ message: 'O campo date é obrigatório' })
  @IsDate({ message: 'O campo date deve ser uma DateTime' })
  date: Date;

  @IsNotEmpty({ message: 'O campo value é obrigatório' })
  @IsInt({ message: 'O campo value deve ser um número inteiro' })
  value: number;

  @IsNotEmpty({ message: 'O campo cashback é obrigatório' })
  @IsInt({ message: 'O campo cashback deve ser um número inteiro' })
  cashback: number;
}

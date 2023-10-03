import { IsInt, IsNotEmpty } from 'class-validator';

export class CashbackDTO {
  @IsNotEmpty({ message: 'O campo cashback é obrigatório' })
  @IsInt({ message: 'O campo cashback deve ser um número inteiro' })
  cashback: number;
}

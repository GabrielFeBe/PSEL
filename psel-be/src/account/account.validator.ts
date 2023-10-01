import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AccountDto {
  @IsNotEmpty({ message: 'O campo id é obrigatório' })
  @IsInt({ message: 'O campo id deve ser um número inteiro' })
  id: number;

  @IsOptional()
  @IsInt({ message: 'O campo cpf deve ser um número inteiro' })
  cpf?: number; // Note que alteramos para campo opcional

  @IsOptional()
  @IsInt({ message: 'O campo cnpj deve ser um número inteiro' })
  cnpj?: number; // Também alterado para opcional

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}

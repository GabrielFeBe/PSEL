import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsCpfValidConstraint } from './cpf.validator';
import { IsCnpjValidConstraint } from './cnpj.validator';

export class AccountDto {
  @IsOptional()
  @IsInt({ message: 'O campo id deve ser um número inteiro' })
  id: number;

  @IsOptional()
  @Validate(IsCpfValidConstraint, {
    message: 'CPF inválido',
  })
  cpf?: string; // Note que alteramos para campo opcional

  @IsOptional()
  @Validate(IsCnpjValidConstraint, {
    message: 'CNPJ inválido',
  })
  cnpj?: string; // Também alterado para opcional

  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}

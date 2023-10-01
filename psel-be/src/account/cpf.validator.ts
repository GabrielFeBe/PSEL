import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCpfValid', async: false })
export class IsCpfValidConstraint implements ValidatorConstraintInterface {
  validate(cpf: string) {
    if (!cpf || cpf.length !== 11) {
      return false;
    }
    // implements the CPF validation logic here
    // returns true if the CPF is valid and false otherwise
    let Soma: number;
    let Resto: number;
    Soma = 0;
    if (cpf == '00000000000') return false;

    for (let i = 1; i <= 9; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    console.log(args);
    return 'CPF inválido';
  }
}

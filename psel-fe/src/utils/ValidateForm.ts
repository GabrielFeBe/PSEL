import type { UAccount } from "@/types/UpdateAcc";

export const validateFormAccount = (form: UAccount) => {
  const { name, email, password, lastName } = form;

  // Verifique se a length de qualquer campo é menor que 6
  if (
    name.length < 6 ||
    email.length < 6 ||
    (password && password.length < 6) || // Verifique se password é definido
    lastName.length < 6
  ) {
    return false; // Desabilite o botão
  }

  return true; // Habilite o botão
};
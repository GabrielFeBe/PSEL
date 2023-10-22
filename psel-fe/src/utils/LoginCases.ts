 const LoginResponseCases:Record<string,string> = {
  "Unauthorized": "Credenciais inválidas",
  "Failed to fetch": "Erro de conexão",

}



export const loginCases = (caseM:string) => {
  console.log(caseM)
  if(LoginResponseCases[caseM]){
    return LoginResponseCases[caseM]
  }
  return "Erro desconhecido";
}
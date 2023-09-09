export function translateErrorMessage(error: string) {
  let translatedErrorMessage = "";
  switch (error) {
    case "To signup, please provide your email":
      translatedErrorMessage = "Por favor, digite seu e-mail";
      break;
    case "Signup requires a valid password":
      translatedErrorMessage = "Digite uma senha válida";
      break;
    case "User already registered":
      translatedErrorMessage = "Usuário já cadastrado";
      break;
    case "Only an email address or phone number should be provided on signup.":
      translatedErrorMessage =
        "Somente um e-mail deve ser fornecido para o cadastro";
      break;
    case "Signups not allowed for this instance":
      translatedErrorMessage = "Cadastro não autorizado";
      break;
    case "Email signups are disabled":
      translatedErrorMessage = "Cadastro via e-mail está desativado";
      break;
    case "Email link is invalid or has expired":
      translatedErrorMessage = "O link é inválido ou extá expirado";
      break;
    case "Token has expired or is invalid":
      translatedErrorMessage = "O token é inválido ou extá expirado";
      break;
    case "The new email address provided is invalid":
      translatedErrorMessage = "O e-mail digitado é invalido";
      break;
    case "Password should be at least 6 characters":
      translatedErrorMessage = "Senha deve conter ao menos seis caracteres";
      break;
    case "Invalid login credentials":
      translatedErrorMessage = "E-mail ou senha inválidos";
      break;
    case "Unable to validate email address: invalid format":
      translatedErrorMessage = "E-mail inválido";
      break;
    default:
      translatedErrorMessage = error;
      break;
  }
  return translatedErrorMessage;
}

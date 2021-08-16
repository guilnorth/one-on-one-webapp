import { ChakraProvider } from '@chakra-ui/react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import theme from 'shared/styles/theme'

import Amplify, { AuthModeStrategyType, I18n } from 'aws-amplify';
import { Translations } from "@aws-amplify/ui-components";
import AppRoutes from './navigation';

import awsconfig from './aws-exports';

Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  }
});

// Amplify.Logger.LOG_LEVEL = 'DEBUG';
I18n.putVocabulariesForLanguage("en-US", {
  [Translations.SIGN_UP_SUBMIT_BUTTON_TEXT]: "Crie sua conta",
  [Translations.SIGN_IN_HEADER_TEXT]: "Entrar na plataforma one-on-one",
  [Translations.SIGN_IN_ACTION]: "Acessar",
  [Translations.SIGN_UP_PASSWORD_PLACEHOLDER]: "Senha",
  [Translations.SIGN_UP_USERNAME_PLACEHOLDER]: "Usuário",
  [Translations.USERNAME_PLACEHOLDER]: "Entre com seu usuário",
  [Translations.PASSWORD_PLACEHOLDER]: "Entre com sua senha",
  [Translations.USERNAME_LABEL]: "Digite seu usuário",
  [Translations.SIGN_UP_EMAIL_PLACEHOLDER]: "Entre com seu Email",
  [Translations.USERNAME_LABEL]: "Digite seu usuário",
  [Translations.PASSWORD_LABEL]: "Digite sua senha",
  [Translations.FORGOT_PASSWORD_TEXT]: "Esqueceu sua senha?",
  [Translations.RESET_PASSWORD_TEXT]: "Resetar senha",
  [Translations.NO_ACCOUNT_TEXT]: "Não tem uma conta?",
  [Translations.SIGN_UP_HEADER_TEXT]: "Crie sua conta agora",
  [Translations.PHONE_LABEL]: "Número de telefone",
  [Translations.SIGN_UP_HAVE_ACCOUNT_TEXT]: "Já tem uma conta?",
  [Translations.SIGN_IN_TEXT]: "Entre agora",
  [Translations.SIGN_OUT]: "Sair",
  [Translations.CREATE_ACCOUNT_TEXT]: "Crie sua conta"
});

I18n.setLanguage("en-US")


const App = () => (
  <ChakraProvider theme={theme}>
    <AppRoutes />
  </ChakraProvider>
)
const t: any = {
  signUpConfig: {
    hiddenDefaults: ['phone_number'],
    signUpFields: [
      { label: 'Name', key: 'name', required: true, type: 'string' },
    ],
  },
}

export default withAuthenticator(App, t)

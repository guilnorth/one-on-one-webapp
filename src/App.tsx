import { ChakraProvider } from '@chakra-ui/react'
// import { ThemeEditorProvider, ThemeEditorDrawerButton } from '@hypertheme-editor/chakra-ui'

import { withAuthenticator } from '@aws-amplify/ui-react'
import theme from 'shared/styles/theme'

import Amplify, { AuthModeStrategyType } from 'aws-amplify';
import AppRoutes from './navigation';

import awsconfig from './aws-exports'; 

Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
    // "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS"
  }
});
// Amplify.Logger.LOG_LEVEL = 'DEBUG';


const App = () => (
  <ChakraProvider theme={theme}>
    {/* <ThemeEditorProvider> */}
        {/* <ThemeEditorDrawerButton pos="fixed" bottom={4} right={2} /> */}
        <AppRoutes/>
     {/*  </ThemeEditorProvider> */}
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

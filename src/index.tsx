import React from 'react'
import ReactDOM from 'react-dom'
import { ColorModeScript } from '@chakra-ui/react'
import './index.css'
import Amplify from 'aws-amplify'
import App from './App'
import reportWebVitals from './reportWebVitals'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

ReactDOM.render(
    <React.StrictMode>
        <ColorModeScript />
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

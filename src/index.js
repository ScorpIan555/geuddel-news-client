/* Application Entry Point  */
// **************************
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import configuration object for AWS Amplify
import Amplify from 'aws-amplify';
// import { awsConfig } from './utils';
import config from './utils/api/awsAmplifyConfig';
// import Redux store
import store from './stores';
// import static assets
import 'bootstrap';
import 'jquery';
// import 'popper';
import '../public/theme/scss/theme.scss'; // app theme
import '../public/theme/js/bootstrap/dropdown'; // theme's dropdown
// import app component entry point
import App from './components/App';

// Initialize AWS Amplify Api service
// connects this client to the serverless/AWS Lambda back-end
Amplify.configure({
  // Auth: awsConfig.Auth,  // AWS Amplify Cognito authorization module
  // Storage: awsConfig.Storage,  // AWS Amplify S3 asset storage module
  // API: awsConfig.API   // AWS Amplify API Gateway api connection module


  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

// app instance
const app = (
  <Provider store={store.configure(null)}> 
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.hydrate(app, document.getElementById('app'));

/* Application Entry Point  */
// **************************
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import configuration object for AWS Amplify
import Amplify from 'aws-amplify';
import { awsConfig } from './utils'; // uncomment when client-api troubleshooting is done
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
  //  // uncomment when client-api troubleshooting is done
  Auth: awsConfig.Auth,  // AWS Amplify Cognito authorization module
  Storage: awsConfig.Storage,  // AWS Amplify S3 asset storage module
  API: awsConfig.API   // AWS Amplify API Gateway api connection module
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

/* Application Entry Point  */
// **************************
//
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './stores';
// import static assets
import 'bootstrap';
import 'jquery';
// import 'popper';
import '../public/theme/scss/theme.scss'; // app theme
import '../public/theme/js/bootstrap/dropdown'; // theme's dropdown
// import app component entry point
import App from './components/App';

const app = (
  <Provider store={store.configure(null)}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.hydrate(app, document.getElementById('app'));

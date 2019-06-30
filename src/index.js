import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';

const app = (
    <App />
);

ReactDOM.hydrate(app, document.getElementById('app'));
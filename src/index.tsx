import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './ErrorBoundary';
import {
  HashRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import {Helmet} from "react-helmet";

ReactDOM.render(
  <React.StrictMode>
      <ErrorBoundary className="App">
        <Router>
          <App />
        </Router>

        <Helmet>
            <meta charSet="utf-8" />
            <title>Stock Quote</title>
        </Helmet>
      </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

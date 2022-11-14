import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppProvider, Frame} from '@shopify/polaris';
import App from './App';
import translations from "@shopify/polaris/locales/en.json";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import history from '../src/components/plugins/history';

ReactDOM.render(
  <Router basename="/build" history={history}><AppProvider
  i18n={translations}>
    <Frame>
      <div className={'orichi-main'} style={{margin : 'auto', width : '70%'}}>
        <App />
      </div>
  </Frame>
</AppProvider></Router>
    , 
    document.getElementById('root')
);


import React from 'react';
import ReactDOM from 'react-dom';

import './style.scss';
import Application from './components/Application';

import database from '../database';

ReactDOM.render(
  <React.StrictMode>
    <Application database={database}/>
  </React.StrictMode>,
  document.getElementById('app')
);

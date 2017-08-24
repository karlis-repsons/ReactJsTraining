import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Presenter from './presentation/Presenter/Presenter';
import FakePresentationConnection from './presentation/FakePresentationConnection/FakePresentationConnection';
import './entry.scss';

const rootConnection = new FakePresentationConnection();

ReactDOM.render(
   <Presenter connection={rootConnection.presenter} />,
   document.getElementById('root')
);
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Presenter from './presentation/Presenter/Presenter';
import FakePresentationConnection from './presentation/FakePresentationConnection/FakePresentationConnection';
import './entry.scss';

ReactDOM.render(
   <Presenter connection={new FakePresentationConnection().presenter} />,
   document.getElementById('root')
);
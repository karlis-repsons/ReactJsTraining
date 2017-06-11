import React from 'react';
import ReactDOM from 'react-dom';

import DemoContainer from './DemoContainer';
import { SquareContainerExample } from 'SquareContainer_kU7d2'; // eslint-disable-line no-unused-vars
import {
    SquareTable_E_BackgroundColorBordersInnerAndOuter, // eslint-disable-line no-unused-vars
    SquareTable_E_Fractal // eslint-disable-line no-unused-vars
} from 'SquareTable_zW3Ec';
import TicTacToe from './TicTacToe/TicTacToe'; // eslint-disable-line no-unused-vars
import './main.scss';

ReactDOM.render(
    <DemoContainer>
        <TicTacToe />
    </DemoContainer>
    , document.getElementById('root')
);
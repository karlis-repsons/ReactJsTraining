import React from 'react';

import isTypeEqual from './isTypeEqual';
import { Row, Cell } from '../../SquareTable_zW3Ec_v0';

export function getCellsWithSuggestedPositions(children) { // -> [{i, j, cell}]
    let i = 0, j = 0;
    let result = [];

    React.Children.forEach(children, row => {
        if (!isTypeEqual(row, Row))
            return;

        j = 0;
        React.Children.forEach(row.props.children, cell => {
            if (!isTypeEqual(cell, Cell))
                return;

            result.push({ i, j, cell });
            j++;
        });
        i++;
    });
    return result;
}
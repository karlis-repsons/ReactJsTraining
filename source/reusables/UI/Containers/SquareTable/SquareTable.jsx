/*
Terminology:
    * cell - aligned part of table for showing a piece of content;
             it does not have borders.
    * inner gap - shortest distance between two cells.
    * outer gap - shortest distance between table container side and cells.

Usage:
    0. import SquareTable, Row, Cell from SquareTable_zW3Ec.
    1. <SquareTable ...>
           <Row>
               <Cell> ... </Cell>
               ...
           </Row>
           ...
       </SquareTable>
    
    2. you control size of square table (or you will not see it),
       table fits aligned cells inside the given size.
    3. add your styling, if needed, provide tableDecorator
       to draw special borders etc.

Notes:
    * unit of absolute measures: 1px.
    * Example components (exported):
        SquareTable_E_BackgroundColorBordersInnerAndOuter
*/

import PropTypes from 'prop-types';
export const propTypes = {
    cellsAtSideCount: PropTypes.number.isRequired, // integer

    className: PropTypes.string, // add your class name(s) to table container div
    innerGapToCellSideLengthRatio: PropTypes.number, // default: 0
    outerGapToInnerGapRatio: PropTypes.number, // default: 1 (0 means no outer gaps)
    innerGapReplacer: PropTypes.func, // (original_distance) => f(original_distance)
    outerGapReplacer: PropTypes.func, // (original_distance) => f(original_distance)
    tableDecorator: PropTypes.func, // ({cellsAtSideCount, tableSideLength, cellSideLength, innerGap, outerGap}) => { ... }

    onResize: PropTypes.func // function(newCellSideLength)
};

// ==========================

import TableController from './impl/TableController';
export class SquareTable extends TableController { }
export default SquareTable;
import onlyOfType from './impl/childrenPropValidator'
import { Row } from './Row';
SquareTable.propTypes = Object.assign(
    {}, propTypes, { children: onlyOfType(Row) }
);

export { Row };
export { Cell } from './Cell';

export {
    Example as SquareTable_E_BackgroundColorBordersInnerAndOuter
} from './Examples/BackgroundColorBordersInnerAndOuter';

// improve:
//          * get precise table container DOM element's content size -
//            without margin, padding etc. WITHOUT using div.fill-all-area
//            inside of container.
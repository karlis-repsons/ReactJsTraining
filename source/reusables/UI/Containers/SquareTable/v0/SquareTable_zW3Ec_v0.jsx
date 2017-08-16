/*
Terminology:
    * cell - aligned part of table for showing a piece of content;
             it does not have borders.
    * inner gap - shortest distance between two cells.
    * outer gap - shortest distance between table container side and cells.

Usage:
    0. import SquareTable, Row, Cell from SquareTable_zW3Ec_v0.
    1. <SquareTable ...>
           <Row>
               <Cell> ... </Cell>
               ...
           </Row>
           ...
       </SquareTable>
    
    2. you control size of square table (or you will not see it),
       table fits aligned cells inside the given size.
    3. add your styling; if needed, provide tableDecorator
       to draw special borders etc.

CSS classes for square alignment:
    center, vcenter, top, bottom, hcenter, left, right.

Static methods:
    * calculateMeasures( props ) ->
          { squareSideLengthPx, cellSideLengthPx,
            innerGap, outerGap }

Notes:
    * unit of absolute measures: 1px.
    * Example components (exported):
        SquareTable_E_BackgroundColorBordersInnerAndOuter
        SquareTable_E_Fractal
*/

import PropTypes from 'prop-types';
export const propTypes = {
    cellsAtSideCount: PropTypes.number.isRequired, // integer
    widthPx: PropTypes.number.isRequired,
    heightPx: PropTypes.number.isRequired,

    className: PropTypes.string, // add your class name(s) to table container div
    style: PropTypes.object, // add style to table container div
    contentStyle: PropTypes.object, // add style to table content div
    innerGapToCellSideLengthRatio: PropTypes.number, // default: 0
    outerGapToInnerGapRatio: PropTypes.number, // default: 1 (0 means no outer gaps)
    innerGapReplacer: PropTypes.func, // (original_distance) => f(original_distance)
    outerGapReplacer: PropTypes.func, // (original_distance) => f(original_distance)
    tableDecorator: PropTypes.func, // ({cellsAtSideCount, tableSideLength, cellSideLength, innerGap, outerGap}) => { ... }
    
    // children: childrenOnlyOfType(Row) - added below
};

// ==========================

import TableController from './impl/TableController';
export class SquareTable extends TableController { }
export default SquareTable;
import childrenOnlyOfType from './impl/PropValidation/childrenPropValidator'
import { Row } from './Row';
SquareTable.propTypes = Object.assign(
    {}, propTypes, { children: childrenOnlyOfType(Row) }
);

export { Row };
export { Cell } from './Cell';

export {
    Example as BackgroundColorBordersExample
} from './Examples/BackgroundColorBorders';
export {
    Fractal as FractalExample
} from './Examples/Fractal';

// improve:
//          ? avoid render() calls if calculator did not return different value
//          ? remove cell content div and let client code add it if needed
//          ? allow to add extra props to table and put them on container div
//          ? add onMounted prop (called when div.cell containers are
//            mounted in the DOM)

// questions:
//          * How much time does it take to re-measure DOM element compared to
//            how much time it takes to remove and re-mount that element in DOM?
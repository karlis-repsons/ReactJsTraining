/*
    Use this to group Cell-s.
    This component does not output anything in the browser DOM.
*/

// ==========================

export function Row() { return null; }

import childrenOnlyOfType from './impl/PropValidation/childrenPropValidator'
import { Cell } from './Cell';
Row.propTypes = { children: childrenOnlyOfType(Cell) }
Row.displayName = 'Row';
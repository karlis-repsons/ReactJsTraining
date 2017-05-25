/*
    Use this to group Cell-s.
    This component does not output anything in the browser DOM.
*/

// ==========================

export function Row() { return null; }

import onlyOfType from './impl/childrenPropValidator'
import { Cell } from './Cell';
Row.propTypes = { children: onlyOfType(Cell) }
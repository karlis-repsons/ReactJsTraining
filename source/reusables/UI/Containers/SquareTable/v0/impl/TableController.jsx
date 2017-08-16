import React from 'react';

import getTableMeasures from './getTableMeasures';
import TableView from './TableView';
import {propTypes as squareTablePropTypes} from '../SquareTable_zW3Ec_v0';
import validateTableProps from './PropValidation/validateTableProps';

export default class TableController extends React.Component {
   static calculateMeasures(props) {
      const m = getTableMeasures(props);
      
      return {
         squareSideLengthPx: m.L,
         cellSideLengthPx: m.c,
         innerGap: m.ig,
         outerGap: m.og
      };
   }
   
   constructor(props) {
      super(props);
      validateTableProps(props);
   }
   
   render() {
      const p = this.props;
      const m = getTableMeasures(p);
      
      return (
         <TableView widthPx={p.widthPx}
                    heightPx={p.heightPx}
                    className={p.className}
                    style={this.props.style}
                    contentStyle={this.props.contentStyle}
                    Nsi={p.cellsAtSideCount}
                    L={m.L} c={m.c} ig={m.ig} og={m.og}
                    tableDecorator={this.props.tableDecorator}
         >
            {this.props.children}
         </TableView>
      );
   }
}

TableController.propTypes = squareTablePropTypes;
import React from 'react';
import PropTypes from 'prop-types';

import {SquareTable, Row, Cell} from 'SquareTable_zW3Ec_v0';

import './BackgroundColorBorders.scss';

export class Example extends React.Component {
   cell(title, cellSideLengthPx) {
      return (
         <Cell
            style={{
               fontSize: `${cellSideLengthPx * 0.30}px`,
               lineHeight: `${cellSideLengthPx * 0.6}px`
            }}
            onClick={() => console.log(`Clicked cell ${title}.`)} // eslint-disable-line no-console
            key={title}
         >{title}</Cell>
      );
   }
   
   render() {
      const tableProps = {
         widthPx: this.props.widthPx,
         heightPx: this.props.heightPx,
         className: 'or4Sy center',
         cellsAtSideCount: 3,
         innerGapToCellSideLengthRatio: 0.06,
         outerGapToInnerGapRatio: 0.2,
         innerGapReplacer: gap => gap < 3 ? 3 : gap,
         outerGapReplacer: gap => gap < 1 ? 1 : gap,
      };
      
      const tableMeasures = SquareTable.calculateMeasures(tableProps);
      let tableContent = [];
      for (let i = 1; i <= 3; i++) {
         let rowContent = [];
         for (let j = 1; j <= 3; j++)
            rowContent.push(
               this.cell(
                  `${i}-${j}`,
                  tableMeasures.cellSideLengthPx));
         
         tableContent.push(<Row key={i}>{rowContent}</Row>);
      }
      
      return (
         <div style={this.props.style}> {
            React.createElement(SquareTable, tableProps, tableContent)
         } </div>
      );
   }
}

Example.propTypes = {
   widthPx: PropTypes.number.isRequired,
   heightPx: PropTypes.number.isRequired,
   style: PropTypes.object
};
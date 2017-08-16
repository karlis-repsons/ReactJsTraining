import React from 'react';
import PropTypes from 'prop-types';

import {SquareTable, Row, Cell} from 'SquareTable_zW3Ec_v0';

import './Fractal.scss';

const maxRecursionsCount = 3;
const cellsCountAtTableSide = 3;

export class Fractal extends React.Component {
   getNextElement(widthPx, heightPx) {
      if (this.props.index === maxRecursionsCount)
         return null;
      
      return (
         <Fractal
            index={this.props.index + 1}
            widthPx={widthPx}
            heightPx={heightPx}
         />
      );
   }
   
   render() {
      const p = this.props;
      const outerColor = 'rgb(192, 74, 35)';
      const innerColor = 'rgb(176, 198, 180)';
      
      const tableProps = {
         cellsAtSideCount: cellsCountAtTableSide,
         widthPx: p.widthPx,
         heightPx: p.heightPx,
         className: `x34d5 center element-${p.index}`,
         innerGapToCellSideLengthRatio: 0.4,
         outerGapToInnerGapRatio: 0,
         contentStyle: {
            backgroundColor: p.index % 2 === 0
               ? outerColor : innerColor
         }
      };
      const cellSideLengthPx =
         SquareTable.calculateMeasures(tableProps).cellSideLengthPx;
      
      let tableContent = [];
      for (let i = 0; i < cellsCountAtTableSide; i++) {
         let rowContent = [];
         for (let j = 0; j < cellsCountAtTableSide; j++) {
            rowContent.push(
               <Cell key={j}
                     style={{
                        backgroundColor: p.index % 2 === 0
                           ? innerColor : outerColor
                     }}
               >
                  {this.getNextElement(cellSideLengthPx, cellSideLengthPx)}
               </Cell>
            );
         }
         tableContent.push(<Row key={i}>{rowContent}</Row>);
      }
      
      const innerContainer =
         React.createElement(SquareTable, tableProps, tableContent);
      
      if (p.index === 0)
         return (
            <div style={p.style}>
               {innerContainer}
            </div>
         );
      else
         return innerContainer;
   }
}

Fractal.propTypes = {
   widthPx: PropTypes.number.isRequired,
   heightPx: PropTypes.number.isRequired,
   style: PropTypes.object,
   index: PropTypes.number // integer
};

Fractal.defaultProps = {
   index: 0
};
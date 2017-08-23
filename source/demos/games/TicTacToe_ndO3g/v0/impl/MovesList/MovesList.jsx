import React from 'react';
import PropTypes from 'prop-types';

import './MovesList.scss';

export default class MovesList extends React.Component {
   get listStyle() {
      const p = this.props;
      
      const columnCount = Math.ceil(p.previousMoves.length / 5);
      const columnGapCSSValue = `${2 * p.baseFontSizeRem}rem`;
      let style = { // Radium or something similar should be used here
         paddingRight: `${3 * p.baseFontSizeRem}rem`,
         
         columnGap: columnGapCSSValue,
         WebkitColumnGap: columnGapCSSValue,
         MozColumnGap: columnGapCSSValue,
         
         columnCount,
         WebkitColumnCount: columnCount,
         MozColumnCount: columnCount
      }
      
      return style;
   }
   
   get listItemStyle() {
      const p = this.props;
      
      let style = {
         fontSize: `${1.5 * p.baseFontSizeRem}rem`
         // optimum: 1.8 for small window sizes, 1.5 for big ones
      };
      
      return style;
   }
   
   render() {
      const p = this.props;
      
      if (p.isVisible === false)
         return null;
      
      return (
         <ol className={`${p.className} cU43g`}
             style={this.listStyle}
         >{
            p.previousMoves.map((move, index) => {
               const title =
                  `by ${move.player}: `
                  + `(${move.position[0] + 1}, ${move.position[1] + 1})`;
               
               let liContent = [<span key='num'>{`${index + 1}. `}</span>];
               if (p.currentMoveIndex === index)
                  liContent.push(<span>{title}</span>);
               else
                  liContent.push(
                     <span key='num'>{
                        `${index + 1}. `
                     }</span>
                     ,
                     <a href='#' onClick={() => p.onClickAtMove(index)}
                        key='lnk'
                     >
                        {title}
                     </a>
                  );
               
               return (
                  <li style={this.listItemStyle} key={index}>{
                     liContent
                  }</li>);
            })
         }</ol>
      );
      
   }
}

MovesList.propTypes = {
   baseFontSizeRem: PropTypes.number.isRequired,
   className: PropTypes.string, // for container
   isVisible: PropTypes.bool,
   previousMoves: PropTypes.arrayOf(PropTypes.any), // [{player, position[2]}]
   currentMoveIndex: PropTypes.number,
   onClickAtMove: PropTypes.func // f(index)
};
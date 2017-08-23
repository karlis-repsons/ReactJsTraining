import React from 'react';
import PropTypes from 'prop-types';

import {
   SquareContainer, squareAlignments
} from 'reusables/all/SquareContainer_kU7d2_v1';
import lengthsDiffer from 'reusables/all/areNumbersDifferent_tSbVE_v0';
import changeHexColorLightness from 'reusables/all/changeHexColorLightness_k42fs_v0';

import Board from './Board/Board';
import MovesList from './MovesList/MovesList';
import {playerX, playerXColor, playerOColor} from './constants';
import './GameView.scss';

export default class GameView extends React.Component {
   constructor() {
      super();
      this.state = {boardSideLength: 0};
      this.setFBsRef = this.setFBsRef.bind(this);
      this.setStatusRef = this.setStatusRef.bind(this);
   }
   
   setFBsRef(r) {
      this.fBsDiv = r;
      this.updateMeasures();
   }
   
   setStatusRef(r) {
      this.statusDiv = r;
      this.updateMeasures();
   }
   
   updateMeasures() {
      let newBoardSideLength;
      
      if (!this.fBsDiv || (!this.statusDiv && this.props.statusText))
         newBoardSideLength = 0;
      else {
         const {width: W, height: H}
            = this.fBsDiv.getBoundingClientRect();
         const h = this.props.statusText ?
            this.statusDiv.getBoundingClientRect().height
            : 0;
         newBoardSideLength = Math.min(W, H - h);
      }
      if (lengthsDiffer(this.state.boardSideLength, newBoardSideLength)) {
         this.setState({boardSideLength: newBoardSideLength});
      }
   }
   
   get baseFontSizeRem() {
      const p = this.props;
      const baseFontSizeRem =
         Math.min(p.widthRem, p.heightRem) / 100 * 2;
      
      return baseFontSizeRem;
   }
   
   getOuterStyle(marginThicknessRem) {
      const p = this.props;
      
      const style = Object.assign(
         {
            margin: `${marginThicknessRem}rem`
         },
         p.style
      );
      
      return style;
   }
   
   get titleStyle() {
      const bfsRem = this.baseFontSizeRem;
      const style = {
         fontSize: `${4 * bfsRem}rem`,
         marginBottom: `${2 * bfsRem}rem`
      };
      
      return style;
   }
   
   get statusStyle() {
      const p = this.props;
      const bfsRem = this.baseFontSizeRem;
      
      let style = {
         paddingTop: `${2 * bfsRem}rem`,
         fontSize: `${2 * bfsRem}rem`
      };
      if (p.previousMoves && p.previousMoves.length > 0)
         style.color = changeHexColorLightness(
            this.props.nextPlayer === playerX
               ? playerXColor : playerOColor
            , +30
         );
      
      return style;
   }
   
   render() {
      const p = this.props;
      const marginThicknessRem =
         Math.min(p.widthRem, p.heightRem) / 8;
      
      return (
         <SquareContainer
            outerWidthRem={p.widthRem - 2 * marginThicknessRem}
            outerHeightRem={p.heightRem - 2 * marginThicknessRem}
            squareAlignment={squareAlignments.centered}
            outerStyle={this.getOuterStyle(marginThicknessRem)}
         >
            <div className='game f32x0'>
               {p.titleText &&
                <div className='title' style={this.titleStyle}>
                   {p.titleText}
                </div>
               }
               <div className='f-bi'>
                  <MovesList className='history'
                             isVisible={p.isGameOver}
                             previousMoves={p.previousMoves}
                             currentMoveIndex={p.indexOfPreviousMarkings}
                             baseFontSizeRem={this.baseFontSizeRem}
                             onClickAtMove={p.onPreviousMarkingsRequest}
                  />
                  <div className='f-bs' ref={this.setFBsRef}>
                     <Board className='board'
                            boardSideLength={this.state.boardSideLength}
                            markings={p.markings}
                            isGameOver={p.isGameOver}
                            onCellClick={p.onCellClick}
                     />
                     {p.statusText &&
                      <div className='status' ref={this.setStatusRef}
                           style={this.statusStyle}
                      >
                         {p.statusText}
                      </div>
                     }
                     <div className='v-padding' />
                  </div>
               </div>
            </div>
         </SquareContainer>
      );
   }
}

GameView.propTypes = {
   widthRem: PropTypes.number.isRequired,
   heightRem: PropTypes.number.isRequired,
   style: PropTypes.object,
   markings: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
   titleText: PropTypes.string,
   statusText: PropTypes.string,
   isGameOver: PropTypes.bool,
   nextPlayer: PropTypes.string,
   previousMoves: PropTypes.arrayOf(PropTypes.any), // use Flow types or TypeScript here
   indexOfPreviousMarkings: PropTypes.number,
   onCellClick: PropTypes.func, // f(i, j)
   onPreviousMarkingsRequest: PropTypes.func // f(index)
};
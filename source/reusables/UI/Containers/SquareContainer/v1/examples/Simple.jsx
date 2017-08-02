import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
   widthRem: PropTypes.number.isRequired,
   heightRem: PropTypes.number,
   style: PropTypes.object,
};

import {
   SquareContainer, squareAlignments
} from '../SquareContainer_kU7d2_v1';

export default function Simple(props) {
   const l = Math.min(props.widthRem, props.heightRem);
   
   const outerStyle = Object.assign({}, props.style, {
      backgroundColor: 'rgb(205, 223, 226)'
   });
   const squareStyle = {
      backgroundColor: 'rgb(223, 152, 66)'
   };
   
   return (
      <SquareContainer
         outerWidthRem={props.widthRem}
         outerHeightRem={props.heightRem}
         outerStyle={outerStyle}
         squareStyle={squareStyle}
         squareAlignment={squareAlignments.centered}
      >
            <span className='letter' style={{
               position: 'absolute',
               top: '50%', left: '50%',
               transform: 'translate(-50%, -50%)',
               fontSize: `${l / 2}rem`,
               lineHeight: `${l}rem`,
               color: '#504f1b'
            }}
            >A</span>
      </SquareContainer>
   );
}

Simple.propTypes = propTypes;
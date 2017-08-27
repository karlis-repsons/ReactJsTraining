import React from 'react';
import PropTypes from 'prop-types';

export default class CloseIcon extends React.Component {
   constructor() {
      super();
   }
   
   render() {
      const p = this.props;
      
      const style = Object.assign(
         {
            clipRule: 'evenodd',
            fillRule: 'evenodd',
            shapeRendering: 'geometricPrecision'
         },
         p.style
      );
      
      return (
         <svg viewBox='0 0 90.0028 90.0028' style={style}>
            <g transform='translate(-50.5263,-76.1769)'>
               <path
                  style={{fill: p.style.color || '#dc3324'}}
                  d='m 50.5263,159.986 83.8091,-83.8091 6.1932,6.1931 -83.8092,83.8091 -6.1931,-6.1931 z m 83.8097,6.1937 -83.8091,-83.8091 6.1931,-6.1932 83.8091,83.8092 -6.1931,6.1931 z'
               />
            </g>
         </svg>
      );
   }
}

CloseIcon.propTypes = {
   style: PropTypes.object
};
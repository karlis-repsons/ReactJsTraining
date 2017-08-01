import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
   style: PropTypes.object,
   widthPx: PropTypes.number,
   heightPx: PropTypes.number
};

import SquareContainer from 'SquareContainer_kU7d2_v0';

import './Example.scss';

export class SquareContainerExample extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         squareSideLength: props.widthPx && props.heightPx
         ? Math.min(props.widthPx, props.heightPx) : undefined
      };
   }
   
   render() {
      const mountedMessage = 'SquareContainer mounted its content square.';
      const l = this.state.squareSideLength;
      
      return (
         <SquareContainer
            className='xJ425 centered'
            style={this.props.style}
            widthPx={this.props.widthPx}
            heightPx={this.props.heightPx}
            onResizeCompleted={
               l => this.setState({squareSideLength: l})
            }
            onMounted={
               () => console.log(mountedMessage) // eslint-disable-line no-console
            }
         >
                <span className='letter' style={{
                   fontSize: `${l / 2}px`,
                   lineHeight: `${l}px`
                }}
                >A</span>
         </SquareContainer>
      );
   }
}

SquareContainerExample.propTypes = propTypes;
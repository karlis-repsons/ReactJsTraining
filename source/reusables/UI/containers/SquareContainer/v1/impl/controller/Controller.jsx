import React from 'react';

import propTypes from '../../SquareContainer_kU7d2_v1';
import validateProps from './validation/validateProps';
import View from '../view/View';
import OuterLayoutCalculator from './layout/OuterLayoutCalculator';
import SquareLayoutCalculator from './layout/SquareLayoutCalculator';
import OuterStyler from './stylers/OuterStyler';
import SquareStyler from './stylers/SquareStyler';

export default class Controller extends React.Component {
   constructor(props) {
      super(props);
      validateProps(props);
   }
   
   render() {
      const p = this.props;
      
      return (
         <View
            outerClassName={p.outerClassName}
            outerStyle={this._outerStyle}
            squareClassName={p.squareClassName}
            squareStyle={this._squareStyle}
         >
            {p.children}
         </View>
      );
   }
   
   get _outerStyle() {
      const props = this.props;
      
      if (props.outputGivenStylesUnmodified === true)
         return props.outerStyle;
      
      const layout = new OuterLayoutCalculator({props});
      const styler = new OuterStyler({props, outerSize: layout.size});
      
      return styler.styleCSS;
   }
   
   get _squareStyle() {
      const props = this.props;
      
      if (props.outputGivenStylesUnmodified === true)
         return props.squareStyle;
      
      const layout = new SquareLayoutCalculator({props});
      const styler = new SquareStyler({props, squareBounds: layout.bounds});
      
      return styler.styleCSS;
   }
}

Controller.propTypes = propTypes;
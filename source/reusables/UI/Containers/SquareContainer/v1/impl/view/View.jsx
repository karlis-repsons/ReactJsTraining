import React from 'react';
import PropTypes from 'prop-types';
import makeClassNames from 'classnames';

export default class View extends React.Component {
   render() {
      const p = this.props;
      
      const classNames = makeClassNames(
         'square container kU7d2', p.className);
      
      return (
         <div className={classNames} style={p.outerStyle}>
            {this._renderSquare()}
         </div>
      );
   }
   
   _renderSquare() {
      const p = this.props;
      
      const classNames = makeClassNames(
         'square', p.squareClassName);
      
      return (
         <div className={classNames} style={p.squareStyle}>
            {p.children}
         </div>
      );
   }
}

View.propTypes = {
   outerClassName: PropTypes.string,
   outerStyle: PropTypes.object,
   squareClassName: PropTypes.string,
   squareStyle: PropTypes.object,
   children: PropTypes.node
};
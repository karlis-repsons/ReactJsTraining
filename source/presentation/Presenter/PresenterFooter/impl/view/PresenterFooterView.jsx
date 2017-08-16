import React from 'react';
import PropTypes from 'prop-types';

import Styler from './PresenterFooterStyler';

export default class PresenterFooterView extends React.Component {
   render() {
      const p = this.props;
      //const content = p.connection.content;
      
      const styler = new Styler({props: p});
      
      return (
         <footer
            className='presenter footer cxE3f'
            style={styler.container.css}
         >
            <div className='content' style={styler.content.css}>
            </div>
         </footer>
      );
   }
}

PresenterFooterView.propTypes = {
   connection: PropTypes.object.isRequired,
   widthRem: PropTypes.number.isRequired,
   heightRem: PropTypes.number.isRequired,
   style: PropTypes.object.isRequired,
   contentStyle: PropTypes.object.isRequired
};
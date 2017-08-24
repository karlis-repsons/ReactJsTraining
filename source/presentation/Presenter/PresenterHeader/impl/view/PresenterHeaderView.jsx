import React from 'react';
import PropTypes from 'prop-types';

import Styler from './PresenterHeaderStyler';

export default class PresenterHeaderView extends React.Component {
   render() {
      const p = this.props;
      const content = p.connection.content;
      
      const styler = new Styler({props: p});
      
      return (
         <header
            className='presenter header jHg4f'
            style={styler.container.css}
         >
            <div className='content' style={styler.content.css}>
               {
                  content.title &&
                  <div className='title' style={styler.title.css}>
                     {content.title}
                  </div>
               }
               <div className='top accent'
                    style={styler.accents.top.css} />
               <div className='middle accent'
                    style={styler.accents.middle.css} />
               <div className='bottom accent'
                    style={styler.accents.bottom.css} />
            </div>
         </header>
      );
   }
}

PresenterHeaderView.propTypes = {
   connection: PropTypes.object.isRequired,
   widthRem: PropTypes.number.isRequired,
   heightRem: PropTypes.number.isRequired,
   style: PropTypes.object.isRequired,
   contentStyle: PropTypes.object.isRequired
};
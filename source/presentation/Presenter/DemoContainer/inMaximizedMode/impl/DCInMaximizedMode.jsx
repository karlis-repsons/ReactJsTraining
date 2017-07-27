import React from 'react';
import makeClassNames from 'classnames';

import propTypes from '../ContainerInMaximizedMode';
import DCInMaximizedModeStyler from './DCInMaximizedModeStyler';

export default class DCInMaximizedMode extends React.Component {
   static predictPaddingRem({connection}) {
      const prUISet = connection.settings.private.ui;
      return prUISet.contentPaddingRem;
   }
   
   render() {
      const p = this.props;
      
      const classNames = makeClassNames(
         'demo container maxmode kU351', p.className);
      
      const styler = new DCInMaximizedModeStyler({props: p});
      
      return (
         <div className={classNames} style={styler.containerDiv.css}>
            <div className='show navigation button'
                 style={styler.navigationButton.css}
                 onClick={p.onNavigationRequest}
            >
               {'< navigate demos'}
            </div>
            
            {p.children}
         
         </div>
      );
   }
}

DCInMaximizedMode.propTypes = propTypes;
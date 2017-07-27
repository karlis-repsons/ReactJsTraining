import React from 'react';
import makeClassNames from 'classnames';

import propTypes from '../ContainerInNavigationMode';
import DCInNavigationModeStyler from './DCInNavigationModeStyler';
import MaximizeIcon from '../MaximizeIcon/MaximizeIcon';

export default class DCInNavigationMode extends React.Component {
   static predictPaddingRem({connection}) {
      const prUISet = connection.settings.private.ui;
      return prUISet.contentPaddingRem;
   }
   
   render() {
      const p = this.props;
      
      const classNames = makeClassNames(
         'demo container navmode yUk56', p.className);
      
      const styler = new DCInNavigationModeStyler({props: p});
      
      return (
         <div className={classNames} style={styler.containerDiv.css}>
            <div className='maximize button'
                 style={styler.maximizeButton.css}
                 onClick={p.isDemoSelected && p.onMaximizeRequest}
            >
               <MaximizeIcon
                  color={styler.maximizeIcon.color}
               />
            </div>
            
            {p.children}
            
         </div>
      );
   }
}

DCInNavigationMode.propTypes = propTypes;
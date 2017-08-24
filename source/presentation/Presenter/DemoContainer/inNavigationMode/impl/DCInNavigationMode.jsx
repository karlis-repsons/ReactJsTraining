import React from 'react';

import propTypes from '../ContainerInNavigationMode';
import DCInNavigationModeStyler from './DCInNavigationModeStyler';

export default class DCInNavigationMode extends React.Component {
   static predictPaddingRem(
      {
         connection,
         selectedDemoConnection: demoConn
      }
   )
   {
      const getMaxTopOverlapRem = () => {
         let result;
         
         const maxOverlapRemAt =
            demoConn.settings.presentation.ui.maxContainerButtonsOverlapRemAt;
         if (typeof maxOverlapRemAt.allSides === 'number')
            result = maxOverlapRemAt.allSides;
         if (typeof maxOverlapRemAt.top === 'number')
            result = maxOverlapRemAt.top;
         if (typeof maxOverlapRemAt.rightTop === 'number')
            result = maxOverlapRemAt.rightTop;
         
         return result;
      };
      
      const reservedHeightRem = 0;
      
      const maxTopOverlapRem = getMaxTopOverlapRem();
      const topPaddingRem =
         Math.max(0, reservedHeightRem - maxTopOverlapRem);
      
      return {
         top: topPaddingRem, right: 0, bottom: 0, left: 0
      };
   }
   
   render() {
      const p = this.props;
      
      const classNames = 'demo container navmode yUk56';
      const styler = new DCInNavigationModeStyler({props: p});
      
      return (
         <div className={classNames} style={styler.container.css}>
            <div className='content' style={styler.content.css}>
               {p.children}
            </div>
         </div>
      );
   }
}

DCInNavigationMode.propTypes = propTypes;

export const predictPaddingRem = DCInNavigationMode.predictPaddingRem;
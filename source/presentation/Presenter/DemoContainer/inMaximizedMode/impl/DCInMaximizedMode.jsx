import React from 'react';

import propTypes from '../ContainerInMaximizedMode';
import DCInMaximizedModeStyler from './DCInMaximizedModeStyler';

export default class DCInMaximizedMode extends React.Component {
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
      
      const getButtonHeightRem = () => {
         const nButPrUISet = connection.settings.private.navigationButton.ui;
         const nbMarginRem = nButPrUISet.marginRem;
         const nbFontSizeRem = nButPrUISet.style.font.sizeRem;
         const nbPaddingHeightRem = (
                                       nButPrUISet.paddingEm.top + nButPrUISet.paddingEm.bottom
                                    ) * nbFontSizeRem;
         
         const result = nbMarginRem.top + nbMarginRem.bottom
                        + nbPaddingHeightRem
                        + nbFontSizeRem;
         return result;
      };
      
      const buttonHeightRem = getButtonHeightRem();
      const maxTopOverlapRem = getMaxTopOverlapRem();
      const topPaddingRem =
         Math.max(0, buttonHeightRem - maxTopOverlapRem);
      
      return {
         top: topPaddingRem, right: 0, bottom: 0, left: 0
      };
   }
   
   render() {
      const p = this.props;
      
      const classNames = 'demo container maxmode kU351';
      const styler = new DCInMaximizedModeStyler({props: p});
      
      return (
         <div className={classNames} style={styler.container.css}>
            <div className='content' style={styler.content.css}>
               <div className='show navigation button'
                    style={styler.navigationButton.css}
               >
                  <div className='title'
                       style={styler.navigationButton.title.css}
                       onClick={p.onNavigationRequest}
                  >
                     {p.connection.content.navigationButton.title}
                  </div>
               </div>
               
               {p.children}
            
            </div>
         </div>
      );
   }
}

DCInMaximizedMode.propTypes = propTypes;

export const predictPaddingRem = DCInMaximizedMode.predictPaddingRem;
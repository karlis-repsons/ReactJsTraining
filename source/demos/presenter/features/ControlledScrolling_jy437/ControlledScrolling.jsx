const displayName = 'ControlledScrolling_jy437';

import React from 'react';
import PropTypes from 'prop-types';

import DemoBase from 'demos/share/DemoBase/DemoBase';

import Styler from './ControlledScrollingStyler';

const settings = {
   presentation: {
      ui: {
         allDemoFitsInsideAnyContainer: false,
         maxContainerButtonsOverlapRemAt: {allSides: 1.5, top: 4.3, bottom: 4.3}
      },
      ux: {
         animation: {
            mayAnimateContentSize: true
         }
      }
   }
};

const demoOwnProps = {
   countOfTextRepeats: PropTypes.number
};

const demoOwnPropDefaults = {
   countOfTextRepeats: 14
};

export default class ControlledScrolling extends DemoBase {
   render() {
      const p = this.props;
      
      const styler = new Styler({props: p});
      const textSourceA = 'Fæder ure ðu ðe eart on heofenum si ðin nama gehalgod to-becume ðin rice geweorþe ðin willa on eorðan swa swa on heofenum. Urne ge dæghwamlican hlaf syle us to-deag and forgyf us ure gyltas swa swa we forgifaþ urum gyltendum ane ne gelæde ðu us on costnunge ac alys us of yfle. ';
      const textSourceB = 'Father our thou that art in heavens be thy name hallowed come thy kingdom be done thy will on earth as in heavens our daily bread give us today and forgive us our sins as we forgive those who have sinned against us and not lead thou us into temptation but deliver us from evil truly. ';
      let textBlocks = [];
      for (let i = 0; i <= p.countOfTextRepeats; i++)
         textBlocks.push(
            <div style={styler.text.css} key={i+'A'}>
               {`${textSourceA}\n\n`}
            </div>,
            <div style={styler.text.css} key={i+'B'}>
               {`${textSourceB}\n\n`}
            </div>
         );
      
      return (
         <div
            className='controlled scrolling demo jy437'
            style={styler.container.css}
         >
            <div style={styler.content.css}>
            
               <h1 style={styler.title.css}>
                  An old English prayer
               </h1>
               
               {textBlocks}
               
            </div>
         </div>
      );
   }
}

ControlledScrolling.settings = settings;
ControlledScrolling.displayName = displayName;
ControlledScrolling.propTypes = Object.assign(
   {}, DemoBase.propTypes, demoOwnProps
);
ControlledScrolling.defaultProps = Object.assign(
   {}, DemoBase.defaultProps, demoOwnPropDefaults
);
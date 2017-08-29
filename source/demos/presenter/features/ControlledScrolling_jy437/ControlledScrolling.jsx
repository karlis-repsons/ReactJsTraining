/* eslint-disable quotes, generator-star-spacing, no-constant-condition */

const displayName = 'ControlledScrolling_jy437';

import React from 'react';
import PropTypes from 'prop-types';

import DemoBase from 'demos/share/DemoBase/DemoBase';

import Styler from './ControlledScrollingStyler';

const settings = {
   presentation: {
      ui: {
         allDemoFitsInsideAnyContainer: false,
         maxContainerButtonsOverlapRemAt: {
            allSides: 1.5,
            top: 4.3,
            bottom: 4.3
         },
         demoPreferences: {}
      },
      ux: {
         animation: {
            mayAnimateContentSize: true
         }
      }
   }
};

const demoOwnProps = {
   countOfTextBlocks: PropTypes.number
};

const demoOwnPropDefaults = {
   countOfTextBlocks: 3
};

function* blocksSource() {
   while (true)
      // Text by Richard Bach
      // http://richardbach.com/jonathan-livingston-seagull-complete-new-edition
      yield [
         'It was morning, and the new sun sparkled gold across the ripples of a gentle sea. A mile from shore a fishing boat chummed the  water.  and  the word for Breakfast Flock flashed through  the  air,  till  a  crowd  of  a thousand seagulls came to dodge and fight for bits of food. It was another busy day beginning.',
         'But way off alone, out by himself beyond  boat  and  shore,  Jonathan Livingston Seagull was practicing. A hundred feet in the  sky  he  lowered his webbed feet, lifted his beak, and strained  to  hold  a  painful  hard twisting curve through his wings.  The  curve  meant  that  he  would  fly slowly, and now he slowed until the wind was a whisper in his face,  until the ocean stood  still  beneath  him.  He  narrowed  his  eyes  in  fierce concentration, held his breath, forced one...  single...  more...  inch... of... curve... Then his featliers ruffled, he stalled and fell.',
         'Seagulls, as you know, never falter, never stall. To stall in the air is for them disgrace and it is dishonor.',
         'But Jonathan Livingston  Seagull,  unashamed,  stretching  his  wings again in that trembling hard curve - slowing, slowing, and  stalling  once more - was no ordinary bird.',
         `Most gulls don't bother to learn more  than  the  simplest  facts  of flight - how to get from shore to food and back again. For most gulls,  it is not flying that matters, but eating. For this gull, though, it was  not eating that mattered,  but  flight.  More  than  anything  else.  Jonathan Livingston Seagull loved to fly.`,
         `This kind of thinking, he found, is not the way to  make  one's  self popular with other birds. Even his parents were dismayed as Jonathan spent whole days alone, making hundreds of low-level glides, experimenting.`
      ];
}

export default class ControlledScrolling extends DemoBase {
   render() {
      const p = this.props;
      
      const styler = new Styler({props: p});
      let formattedTextBlocks = [];
      let bi = 0;
      for (const textBlock of blocksSource()) {
         if (bi === p.countOfTextBlocks)
            break;
         
         let pi = 0;
         let formattedParagraphs = [];
         for (const paragraphText of textBlock) {
            formattedParagraphs.push(
               <p style={styler.text.paragraph} key={pi}>{
                  paragraphText
               }</p>
            );
            pi++;
         }
         
         formattedTextBlocks.push(
            <div style={styler.text.block} key={bi}>{
               formattedParagraphs
            }</div>
         );
         
         bi++;
      }
      
      return (
         <div
            className='controlled scrolling demo jy437'
            style={styler.container.css}
         >
            <div style={styler.content.css}>
               
               <div style={styler.author.css}>
                  <a href='http://richardbach.com/jonathan-livingston-seagull-complete-new-edition/'
                     style={styler.author.link.css}
                  >
                     Richard Bach&apos;s
                  </a>
               </div>
               
               <h1 style={styler.title.css}>
                  Jonathan Livingston Seagull
               </h1>
               
               <div style={styler.dedication.css}>
                  <div style={styler.dedication.text.css}>
                     To the real Jonathan Seagull,
                     who lives within us all.
                  </div>
               </div>
               
               <h2 style={styler.h2.css}>
                  Part One
               </h2>
               
               {formattedTextBlocks}
            
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
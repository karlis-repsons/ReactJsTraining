const displayName = 'Simple demo of SquareContainer_kU7d2_v1';

import React from 'react';

import DemoBase from 'demos/share/DemoBase/DemoBase';
import {SimpleExample} from 'SquareContainer_kU7d2_v1';

const settings = {
   presentation: {
      ui: {
         allDemoFitsInsideAnyContainer: true,
         maxContainerButtonsOverlapRemAt: {allSides: 0}
      },
      ux: {
         animation: {
            mayAnimateContentSize: true
         }
      }
   }
};

export default class Simple extends DemoBase {
   render() {
      const p = this.props;
     
      const marginThicknessRem = Math.min(p.widthRem, p.heightRem) / 8;
      const style = Object.assign(
         {
            margin: `${marginThicknessRem}rem`
         },
         this.baseStyle
      );
      
      return (
         <SimpleExample
            widthRem={p.widthRem - 2 * marginThicknessRem}
            heightRem={p.heightRem - 2 * marginThicknessRem}
            style={style} />
      );
   }
}

Simple.settings = settings;
Simple.displayName = displayName;
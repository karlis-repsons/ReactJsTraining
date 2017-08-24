const displayName = 'Fractal demo of SquareTable_zW3Ec_v0';

import React from 'react';

import DemoBase from 'demos/share/DemoBase/DemoBase';
import {FractalExample} from 'SquareTable_zW3Ec_v0';

const settings = {
   presentation: {
      ui: {
         allDemoFitsInsideAnyContainer: true,
         maxContainerButtonsOverlapRemAt: {allSides: 0},
         demoPreferences: {}
      },
      ux: {
         animation: {
            mayAnimateContentSize: false
         }
      }
   }
};

export default class Demo extends DemoBase {
   render() {
      const p = this.props;
      
      const marginThicknessPx = Math.min(p.widthPx, p.heightPx) / 8;
      const style = Object.assign(
         {
            margin: `${marginThicknessPx}px`
         },
         this.baseStyle
      );
      
      return (
         <FractalExample
            widthPx={p.widthPx - 2 * marginThicknessPx}
            heightPx={p.heightPx - 2 * marginThicknessPx}
            style={style} />
      );
   }
}

Demo.settings = settings;
Demo.displayName = displayName;
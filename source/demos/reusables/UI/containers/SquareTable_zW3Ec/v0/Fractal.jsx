const displayName = 'Fractal demo of SquareTable_zW3Ec_v0';

import React from 'react';

import DemoBase from 'demos/share/DemoBase/DemoBase';
import {FractalExample} from 'SquareTable_zW3Ec_v0';

const settings = {
   presentation: {
      ui: {
         allDemoFitsInsideAnyContainer: true,
         maxContainerButtonsOverlapRemAt: {allSides: 0}
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
      
      return (
         <FractalExample
            widthRem={p.widthRem}
            heightRem={p.heightRem}
            style={this.baseStyle} />
      );
   }
}

Demo.settings = settings;
Demo.displayName = displayName;
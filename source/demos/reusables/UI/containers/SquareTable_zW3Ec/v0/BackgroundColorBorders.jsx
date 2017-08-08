const displayName = 'BackgroundColorBorders demo of SquareTable_zW3Ec_v0';

import React from 'react';

import DemoBase from 'demos/share/DemoBase/DemoBase';
import {BackgroundColorBordersExample} from 'SquareTable_zW3Ec_v0';

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
         <BackgroundColorBordersExample
            widthRem={p.widthRem}
            heightRem={p.heightRem}
            style={this.baseStyle} />
      );
   }
}

Demo.settings = settings;
Demo.displayName = displayName;
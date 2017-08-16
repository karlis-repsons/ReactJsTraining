const displayName = 'Simple demo of SquareContainer_kU7d2_v1';

import React from 'react';

import DemoBase from 'demos/share/DemoBase/DemoBase';
import {SimpleExample} from 'SquareContainer_kU7d2_v1';

const settings = {
   presentation: {
      ui: {
         allDemoFitsInsideAnyContainer: true,
         maxContainerButtonsOverlapRemAt: {allSides: Number.MAX_VALUE}
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
      
      return (
         <SimpleExample
            widthRem={p.widthRem}
            heightRem={p.heightRem}
            style={this.baseStyle} />
      );
   }
}

Simple.settings = settings;
Simple.displayName = displayName;
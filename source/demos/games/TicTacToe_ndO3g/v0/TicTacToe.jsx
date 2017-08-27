const displayName = 'TicTacToe_ndO3g_v0';

const settings = {
   presentation: {
      ui: {
         allDemoFitsInsideAnyContainer: true,
         maxContainerButtonsOverlapRemAt: {allSides: Number.MAX_VALUE}, // TODO
         demoPreferences: {}
      },
      ux: {
         animation: {
            mayAnimateContentSize: false
         }
      }
   }
};

// =======================

import React from 'react';

import DemoBase from 'demos/share/DemoBase/DemoBase';

import GameController from './impl/GameController';

export default class TicTacToe extends DemoBase {
   render() {
      const p = this.props;
      
      const paddingThicknessRem =
         Math.min(p.widthRem, p.heightRem) / 8;
      const outerStyle = {
         backgroundColor: 'white',
         width: `${p.widthRem}rem`,
         height: `${p.heightRem}rem`,
         padding: `${paddingThicknessRem}rem`
      };
      
      return (
         <div className='tic tac toe demo' style={outerStyle}>
            <GameController
               widthRem={p.widthRem - 2 * paddingThicknessRem}
               heightRem={p.heightRem - 2 * paddingThicknessRem}
            />
         </div>
      );
   }
}

TicTacToe.displayName = displayName;
TicTacToe.settings = settings;
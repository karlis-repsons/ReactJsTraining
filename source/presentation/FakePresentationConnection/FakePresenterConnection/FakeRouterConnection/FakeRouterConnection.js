import SquareContainer_kU7d2_v1_Simple from 'demos/all/SquareContainer_kU7d2_v1_Simple';

import SquareTable_zW3Ec_v0_BackgroundColorBorders from 'demos/all/SquareTable_zW3Ec_v0_BackgroundColorBorders';
import SquareTable_zW3Ec_v0_Fractal from 'demos/all/SquareTable_zW3Ec_v0_Fractal';

import TicTacToe_ndO3g_v0 from 'demos/all/TicTacToe_ndO3g_v0';

export default class FakeRouterConnection {
   constructor() {
      this.routes = this.getRoutes();
   }
   
   getRoutes() {
      return [
         {
            demoPathOnServer: '/demos/square-container-kU7d2/v1/simple',
            demoUIComponent: SquareContainer_kU7d2_v1_Simple
         },
         {
            demoPathOnServer: '/demos/square-table-zW3Ec/v0/background-color-borders',
            demoUIComponent: SquareTable_zW3Ec_v0_BackgroundColorBorders
         },
         {
            demoPathOnServer: '/demos/square-table-zW3Ec/v0/fractal',
            demoUIComponent: SquareTable_zW3Ec_v0_Fractal
         },
         {
            demoPathOnServer: '/demos/tic-tac-toe-ndO3g/v0',
            demoUIComponent: TicTacToe_ndO3g_v0
         }
      ];
   }
}
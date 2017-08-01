import {SquareContainerExample} from 'SquareContainer_kU7d2_v0';
import {
   SquareTable_E_BackgroundColorBordersInnerAndOuter,
   SquareTable_E_Fractal
} from 'SquareTable_zW3Ec_v0';
import TicTacToe from 'demos/TicTacToe/TicTacToe';

export default class FakeRouterConnection {
   constructor() {
      this.routes = this.getRoutes();
   }
   
   getRoutes() {
      return [
         {
            demoPathOnServer: '/demos/square-container-kU7d2/r3lMw',
            demoUIComponent: SquareContainerExample
         },
         {
            demoPathOnServer: '/demos/square-table-zW3Ec/kT324',
            demoUIComponent: SquareTable_E_BackgroundColorBordersInnerAndOuter
         },
         {
            demoPathOnServer: '/demos/square-table-zW3Ec/fractal-wpo03',
            demoUIComponent: SquareTable_E_Fractal
         },
         {
            demoPathOnServer: '/demos/tic-tac-toe-ndO3g',
            demoUIComponent: TicTacToe
         }
      ];
   }
}
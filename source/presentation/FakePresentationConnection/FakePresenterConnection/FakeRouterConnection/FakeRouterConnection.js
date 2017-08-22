import SquareContainer_kU7d2_v1_Simple from 'demos/all/SquareContainer_kU7d2_v1_Simple';
import SquareTable_zW3Ec_v0_BackgroundColorBorders from 'demos/all/SquareTable_zW3Ec_v0_BackgroundColorBorders';
import SquareTable_zW3Ec_v0_Fractal from 'demos/all/SquareTable_zW3Ec_v0_Fractal';
import TicTacToe_ndO3g_v0 from 'demos/all/TicTacToe_ndO3g_v0';
import ControlledScrolling_jy437 from 'demos/all/ControlledScrolling_jy437';

import SVGMapViewer_g73Kd from 'demos/all/SVGMapViewer_g73Kd';
import PresenterSVG from './resources/structureMaps/Presenter';
import Presenter_typesSVG from './resources/structureMaps/Presenter_types';
import Presenter_impl_layoutSVG from './resources/structureMaps/Presenter_impl_layout';

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
         },
         {
            demoPathOnServer: '/demos/controlled-scrolling-jy437/repeat-0',
            demoUIComponent: ControlledScrolling_jy437,
            demoOwnPropValues: {
               countOfTextBlocks: 1
            }
         },
         {
            demoPathOnServer: '/demos/controlled-scrolling-jy437/repeat-14',
            demoUIComponent: ControlledScrolling_jy437,
            demoOwnPropValues: {
               countOfTextBlocks: 3
            }
         },
         {
            demoPathOnServer: '/demos/structure/samples/presenter',
            demoUIComponent: SVGMapViewer_g73Kd,
            demoOwnPropValues: {
               svgElement: PresenterSVG
            }
         },
         {
            demoPathOnServer: '/demos/structure/samples/presenter-types',
            demoUIComponent: SVGMapViewer_g73Kd,
            demoOwnPropValues: {
               svgElement: Presenter_typesSVG
            }
         },
         {
            demoPathOnServer: '/demos/structure/samples/presenter-impl-layout',
            demoUIComponent: SVGMapViewer_g73Kd,
            demoOwnPropValues: {
               svgElement: Presenter_impl_layoutSVG
            }
         }
      ];
   }
}
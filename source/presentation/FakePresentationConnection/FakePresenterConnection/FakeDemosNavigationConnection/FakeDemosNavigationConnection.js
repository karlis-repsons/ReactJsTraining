import getSharedSettingsForInput from 'presentation/FakePresentationConnection/settings/getSharedSettingsForInput';
import FakeDemoNavigationItemConnection from './FakeDemoNavigationItemConnection/FakeDemoNavigationItemConnection';
import FakeGroupingNavigationItemConnection from './FakeGroupingNavigationItemConnection/FakeGroupingNavigationItemConnection';

export default class FakeDemosNavigationConnection {
   constructor({settings: settingsInput}) {
      this.settings = {
         shared: getSharedSettingsForInput(settingsInput),
         private: settingsInput.private
      };
      this.demoNavigationItem = new FakeDemoNavigationItemConnection({
         settings: settingsInput.demoNavigationItem
      });
      this.groupingNavigationItem = new FakeGroupingNavigationItemConnection({
         settings: settingsInput.groupingNavigationItem
      });
      this.content = {
         sourceNavigationTree: this.getSourceNavigationTree()
      };
   }
   
   getSourceNavigationTree() {
      return [
         {
            title: 'The first and failing tries',
            children: [
               {
                  title: 'SquareTable',
                  demoPathOnServer: '/demos/square-table-zW3Ec/v0/background-color-borders',
                  children: [
                     {
                        title: 'fractal of SquareTable-s',
                        demoPathOnServer: '/demos/square-table-zW3Ec/v0/fractal'
                     }
                  ]
               },
               {
                  title: 'Tic Tac Toe game',
                  demoPathOnServer: '/demos/tic-tac-toe-ndO3g/v0'
               }
            ]
         },
         {
            title: 'Presenter features',
            children: [
               {
                  title: 'controlled scrolling',
                  children: [
                     {
                        title: 'short text',
                        demoPathOnServer: '/demos/controlled-scrolling-jy437/repeat-0'
                     },
                     {
                        title: 'long text',
                        demoPathOnServer: '/demos/controlled-scrolling-jy437/repeat-14'
                     }
                  ]
               },
               {
                  title: 'structure',
                  demoPathOnServer: '/demos/structure/samples/presenter',
                  children: [
                     {
                        title: 'layout data',
                        demoPathOnServer: '/demos/structure/samples/presenter-types'
                     },
                     {
                        title: 'layout implementation',
                        demoPathOnServer: '/demos/structure/samples/presenter-impl-layout'
                     }
                  ]
               }
            ]
         },
         {
            title: 'Reusables',
            children: [
               {
                  title: 'SquareContainer',
                  demoPathOnServer: '/demos/square-container-kU7d2/v1/simple'
               }
            ]
         }
      ];
   }
}
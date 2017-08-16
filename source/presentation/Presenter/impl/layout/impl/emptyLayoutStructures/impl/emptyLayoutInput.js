import {u} from './emptyPrimitives';

export const emptyLayoutInput = {
   widthRem: u,
   heightRem: u,
   preferShowingDemoOrNavigation: u,
   header: {heightRem: u},
   demosNavigation: {
      tree: {
         widthRem: u
      }
   },
   demoContainer: {
      preferMaximized: u,
      isDemoSelected: u,
      scrollContainer: {
         verticalScrollDistanceRem: 0,
         demo: {
            currentSize: {
               widthWithMarginsRem: u,
               heightWithMarginsRem: u
            }
         }
      }
   },
   footer: {heightRem: u}
};
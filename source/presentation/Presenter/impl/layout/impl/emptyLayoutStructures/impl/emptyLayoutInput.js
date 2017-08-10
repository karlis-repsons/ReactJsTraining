import {u} from './emptyPrimitives';

export const emptyLayoutInput = {
   widthRem: u,
   heightRem: u,
   preferShowingDemoOrNavigation: u,
   header: {heightRem: u},
   navigation: {
      tree: {
         widthRem: u
      }
   },
   demoContainer: {
      preferMaximized: u,
      isDemoSelected: u,
      demo: {
         verticalScrollDistanceRem: 0,
         currentSize: {
            widthWithMarginsRem: u,
            heightWithMarginsRem: u
         }
      }
   },
   footer: {heightRem: u}
};
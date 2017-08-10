import {u, emptyBounds as eb} from './emptyPrimitives';

export const emptyLayout = {
   isMobileUIMode: u,
   root: {
      containsHeader: u,
      containsFooter: u
   },
   header: {
      boundsRem: eb,
      content: {
         boundsRem: eb
      }
   },
   navigation: {
      boundsRem: eb,
      isMaximized: u,
      isHidden: u,
      content: {
         boundsRem: eb
      }
   },
   demoContainer: {
      boundsRem: eb,
      isMaximized: u,
      isHidden: u,
      containsHeader: u,
      containsFooter: u,
      content: {
         boundsRem: eb
      }
   },
   footer: {
      boundsRem: eb,
      content: {
         boundsRem: eb
      }
   }
};
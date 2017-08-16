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
   demosNavigation: {
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
         boundsRem: eb,
         scrollContainer: {
            boundsRem: eb,
            hasScroll: u
         }
      }
   },
   footer: {
      boundsRem: eb,
      content: {
         boundsRem: eb
      }
   }
};
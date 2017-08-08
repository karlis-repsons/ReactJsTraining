import {SystemException} from 'exceptionTypes_mjS3d_v0';

import lengthStringFromStyle from './lengthStringFromStyle';

export default class OuterLayoutCalculator {
   constructor({props}) {
      this._props = props;
   }
   
   get size() {
      const p = this._props;
      const os = p.outerStyle;
      
      let width = lengthStringFromStyle(os, 'width');
      if (typeof p.outerWidthRem === 'number')
         width = `${p.outerWidthRem}rem`;
      
      let height = lengthStringFromStyle(os, 'height');
      if (typeof p.outerHeightRem === 'number')
         height = `${p.outerHeightRem}rem`;
      
      if (! width || !height)
         throw new SystemException('Failed size calculation.');
      
      return {width, height};
   }
}
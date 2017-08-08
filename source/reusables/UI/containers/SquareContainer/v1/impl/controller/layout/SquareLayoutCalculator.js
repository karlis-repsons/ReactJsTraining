import lengthStringFromStyle from './lengthStringFromStyle';
import {squareAlignments} from '../../../SquareContainer_kU7d2_v1';

export default class SquareLayoutCalculator {
   constructor({props}) {
      this._props = props;
   }
   
   get bounds() {
      const p = this._props;
      const sqs = p.squareStyle;
      
      let {width, height} = (() => {
         let width = lengthStringFromStyle(sqs, 'width');
         let height = lengthStringFromStyle(sqs, 'height');
         if (typeof p.squareSideLengthRem === 'number') {
            width = `${p.squareSideLengthRem}rem`;
            height = width;
         }
         if (typeof p.outerWidthRem === 'number'
             && typeof p.outerHeightRem === 'number'
         ) {
            const minLengthString = `${
               Math.min(p.outerWidthRem, p.outerHeightRem)}rem`;
            
            if (!width)
               width = minLengthString;
            
            if (!height)
               height = minLengthString;
         }
         return {width, height};
      })();
      
      let {top, right, bottom, left} = (() => {
         let top = lengthStringFromStyle(sqs, 'top');
         let right = lengthStringFromStyle(sqs, 'right');
         let bottom = lengthStringFromStyle(sqs, 'bottom');
         let left = lengthStringFromStyle(sqs, 'left');
         
         if (p.squareAlignment === squareAlignments.centered) {
            top = '50%';
            left = '50%';
            bottom = null;
            right = null;
         }
         return {top, right, bottom, left};
      })();
      
      return {top, right, bottom, left, width, height};
   }
}
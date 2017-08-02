import copyIfGiven from './copyIfGiven';
import {squareAlignments} from '../../../SquareContainer_kU7d2_v1';

export default class SquareStyler {
   constructor({props, squareBounds}) {
      this._props = props;
      this._squareBounds = squareBounds;
   }
   
   get styleCSS() {
      const p = this._props;
      const b = this._squareBounds;
      
      let result = Object.assign({}, p.squareStyle);
      result.position = 'absolute';
      
      const layoutProperties = [
         'top', 'right', 'bottom', 'left', 'width', 'height'
      ];
      for (const property of layoutProperties)
         copyIfGiven({source: b, property, target: result});
      
      if (p.squareAlignment === squareAlignments.centered)
         result.transform = 'translate(-50%, -50%)';
      
      return result;
   }
}
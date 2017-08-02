import copyIfGiven from './copyIfGiven';

export default class OuterStyler {
   constructor({props, outerSize}) {
      this._props = props;
      this._outerSize = outerSize;
   }
   
   get styleCSS() {
      const styleInput = this._props.outerStyle;
      const size = this._outerSize;
      
      let result = Object.assign({}, styleInput);
      if (this._shouldSetPositionRelative)
         result.position = 'relative';
      copyIfGiven({source: size, property: 'width', target: result});
      copyIfGiven({source: size, property: 'height', target: result});
      
      return result;
   }
   
   get _shouldSetPositionRelative() {
      const osp = this._props.outerStyle.position;
      if (!osp)
         return true;
      
      return osp !== 'relative' && osp !== 'fixed' && osp !== 'absolute';
   }
}
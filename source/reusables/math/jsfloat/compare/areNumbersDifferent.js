import {ArgumentException} from 'exceptionTypes_mjS3d';

export default function areNumbersDifferent(n1, n2) {
   if (typeof n1 !== 'number' || typeof n2 !== 'number') {
      const arg1Text = typeof n1 !== 'number' ?
         ' For first parameter.' : '';
      const arg2Text = typeof n1 !== 'number' ?
         ' For second parameter.' : '';
      
      throw new ArgumentException(
         `Got non-number input.${arg1Text}${arg2Text}`);
   }
   
   return Math.abs(n1 - n2) >= Number.EPSILON;
}
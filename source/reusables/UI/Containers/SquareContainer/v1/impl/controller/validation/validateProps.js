import {ArgumentException} from 'exceptionTypes_mjS3d_v0';

/*
Note: this does not attempt to make a complete validation,
      but does try to catch out obvious errors, which might occur.
*/
export default function validateProps(props) {
   validateOuterProps(props);
   validateInnerProps(props);
}

function validateOuterProps(p) {
   if (p.outputGivenStylesUnmodified) {
      if (typeof p.outerWidthRem === 'number'
          || typeof p.outerHeightRem === 'number'
      )
         throw new ArgumentException(
            'Props outerWidthRem and outerHeightRem '
            + 'are disabled when outputGivenStylesUnmodified '
            + 'is set to true.');
   }
}

function validateInnerProps(p) {
   if (p.outputGivenStylesUnmodified) {
      if (typeof p.squareSideLengthRem === 'number'
          || p.squareAlignment
      )
         throw new ArgumentException(
            'Props squareSideLengthRem and squareAlignment'
            + 'are disabled when outputGivenStylesUnmodified '
            + 'is set to true.');
   }
}
/*
Usage:
   * do not modify your <html> element's font-size.
   * do not use this if any targeted browser changes
     html element's font-size
     during page load or after that.
  
   * call convertPxToRem(100)
     to get length of 100px in rem as number.
 
   * call convertRemToPx(10)
     to get length of 10rem in px as number.
*/

const oneRemLengthPx = parseFloat(
   getComputedStyle(document.querySelector('html')).fontSize);

/**
 * @param lengthPx - number
 * @returns lengthRem - number
 */
export function convertPxToRem(lengthPx) {
   return lengthPx / oneRemLengthPx;
}

/**
 * @param lengthRem - number
 * @returns lengthPx - number
 */
export function convertRemToPx(lengthRem) {
   return lengthRem * oneRemLengthPx;
}
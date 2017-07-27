/*
Usage:
   * see convertPxAndRem.js.
   * keep canvas HTML element available with its up-to-date ID here.
   * more info about canvas measurements in TextWidthMeasurer_C34kj.
*/

import TextWidthMeasurer from 'TextWidthMeasurer_C34kj';
import {convertPxToRem} from './convertPxAndRem';

const canvasHTMLElementId = 'canvas-for-measurements';
const measurer = new TextWidthMeasurer(
   document.getElementById(canvasHTMLElementId));

export default function measureTextWidthRem(text, {cssFont}) {
   return convertPxToRem(
      measurer.measurePx(text, {cssFont})
   );
}
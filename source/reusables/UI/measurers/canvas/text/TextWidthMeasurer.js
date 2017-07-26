/*
Usage:
   1. output canvas HTML element in browser DOM, e.g. this:
      <canvas id='canvas-for-measurements' width='1' height='1'
              style='display: none'>
      </canvas>
   
   2. keep canvas in browser DOM as long as you need measurements.
   
   3. import TextWidthMeasurer from TextWidthMeasurer_C34kj.
   
   4. use TextWidthMeasurer instance, e.g. like this:
      4.1. export const textWidthMeasurer = new TextWidthMeasurer(
              document.getElementById('canvas-for-measurements'));
 
      4.2. textWidthMeasurer.measurePx(textToMeasure, {cssFont});
           returns width in pixels (number).

Notes:
   * cssFont example: italic 2rem "Open Sans", sans-serif
   * Internet Explorer: using rem units for text measurement
                        in canvas gives wrong results.
*/

import {ArgumentException} from 'exceptionTypes_mjS3d';

export default class TextWidthMeasurer {
   constructor(canvasHTMLElement) {
      if (!canvasHTMLElement)
         throw new ArgumentException(
            'Missing canvas HTML element.');
      
      this._canvasHTMLElement = canvasHTMLElement;
   }
   
   measurePx(text, {cssFont}) {
      if (typeof text !== 'string')
         throw new ArgumentException('Missing text string.');
      if (typeof cssFont !== 'string')
         throw new ArgumentException(
            'Missing CSS font (e.g. italic 2rem "Open Sans", sans-serif).');
      
      let context = this._canvasHTMLElement.getContext('2d');
      context.font = cssFont;
      
      return context.measureText(text).width;
   }
}
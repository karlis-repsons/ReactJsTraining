import measureTextWidthRem from 'presentation/Presenter/share/measureTextWidthRem';

export default function predictHeaderHeightRem(
   {connection, widthRem}
) {
   const prSet = connection.settings.private;
   
   const minWidthRem = prSet.ui.sizeRem.min.width;
   if (typeof minWidthRem === 'number' && widthRem < minWidthRem)
      return 0;
   
   const titlePrUISty = prSet.title.ui.style;
   let titleMarginRem = getTitleMarginRem(titlePrUISty.marginRem);
   let titlePaddingRem = getTitlePaddingRem(titlePrUISty);
   
   let predictedHeightRem =
      getTitleTextHeightRem({connection, headerWidthRem: widthRem})
      + titleMarginRem.top + titleMarginRem.bottom
      + titlePaddingRem.top + titlePaddingRem.bottom;
   
   const minHeightRem = prSet.ui.sizeRem.min.height || 0;
   
   return Math.max(predictedHeightRem, minHeightRem);
}

function getTitleTextHeightRem({connection, headerWidthRem}) {
   const prSet = connection.settings.private;
   const shUISet = connection.settings.shared.ui;
   const titlePrUISty = prSet.title.ui.style;
   
   let titleMarginRem = getTitleMarginRem(titlePrUISty.marginRem);
   let titlePaddingRem = getTitlePaddingRem(titlePrUISty);
   
   const maxAllowedTitleLineWidthRem =
      headerWidthRem
      - (titleMarginRem.left + titleMarginRem.right
         + titlePaddingRem.left + titlePaddingRem.right);
   
   const title = connection.content.title;
   const titleFont = titlePrUISty.font;
   const titleFontNames =
      titleFont.names ||
      shUISet.style.font.defaultFontNames;
   const titleFontCSSValue =
      `${titleFont.sizeRem}rem ${titleFontNames || ''}`;
   const singleLineTitleWidthRem =
      measureTextWidthRem(title, {cssFont: titleFontCSSValue});
   
   if (singleLineTitleWidthRem <= maxAllowedTitleLineWidthRem)
      return titlePrUISty.lineHeightRem;
   else {
      let countOfLinesNeeded = 1;
      let textOfCurrentLine = '';
      for (const nonSpacePart of title.split(/\s+/g)) {
         textOfCurrentLine +=
               `${textOfCurrentLine.length ? ' ' : '' }${nonSpacePart}`;
         
         const currentLineWidthRem = measureTextWidthRem(
                  textOfCurrentLine, {cssFont: titleFontCSSValue});
         
         if (currentLineWidthRem > maxAllowedTitleLineWidthRem) {
            countOfLinesNeeded++;
            textOfCurrentLine = nonSpacePart;
         }
      }
      
      return countOfLinesNeeded * titlePrUISty.lineHeightRem;
   }
}

function getTitleMarginRem(inputMarginRem) {
   let titleMarginRem = {top: 0, right: 0, bottom: 0, left: 0};
   if (inputMarginRem) {
      const m = inputMarginRem;
      titleMarginRem = {
         top: m.top, right: m.right, bottom: m.bottom, left: m.left
      };
   }
   
   return titleMarginRem;
}

function getTitlePaddingRem(titlePrivateUIStyle) {
   let titlePaddingRem = {top: 0, right: 0, bottom: 0, left: 0};
   // what should I do when JavaScript does not allow me
   // to define margin and padding types
   // and their operators support?
   if (titlePrivateUIStyle.paddingEm) {
      const fontSizeRem = titlePrivateUIStyle.font.sizeRem;
      const p = titlePrivateUIStyle.paddingEm;
      titlePaddingRem = {
         top: p.top * fontSizeRem,
         right: p.right * fontSizeRem,
         bottom: p.bottom * fontSizeRem,
         left: p.left * fontSizeRem
      };
   }
   
   return titlePaddingRem;
}
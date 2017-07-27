import {
   convertRemToPx, convertPxToRem
} from '../../../../share/convertPxAndRem';
import DemosNavigationTreeCalculator from './DemosNavigationTreeCalculator';

/*
   Do NOT cache this,
   since props might change after construction of this class.
 */
export default class DemosNavigationTreeStyler {
   constructor(treePrivateUISettings) {
      this._treePrivateUISettings = treePrivateUISettings;
      this._calculator = new DemosNavigationTreeCalculator(
         treePrivateUISettings);
   }
   
   get _parameters() {
      return {
         calc: this._calculator,
         prUISet: this._treePrivateUISettings
      };
   }
   
   get overrideCSS() {
      return this._overrideOuterContainerCSS + ' ' +
             this._overrideStructureLinesCSS + ' ' +
             this._overrideCollapseAndExpandButtonsCSS + ' ' +
             this._overrideNavigationItemContainerCSS;
   }
   
   get _overrideOuterContainerCSS() {
      const {calc} = this._parameters;
      const leftMarginRem = calc.leftMarginRem;
      
      return (
         `.rst__node {
            margin-left: ${leftMarginRem}rem;
            margin-right: ${leftMarginRem < 0 ? -leftMarginRem : 0}rem;
         }
         .rst__rowWrapper {
            padding: 10px ${calc.rightPaddingRem}rem 10px 0;
         }`
      );
   }
   
   get _overrideStructureLinesCSS() {
      const getLineThicknessPx = (line) => {
         if (!line.minThicknessPx)
            return convertRemToPx(line.thicknessRem);
         
         const startRoundingAtPercentOfMin = 200;
         const remThicknessInPx = convertRemToPx(line.thicknessRem);
         let resultPx = Math.max(line.minThicknessPx, remThicknessInPx);
         if (line.minThicknessPx * startRoundingAtPercentOfMin / 100
             >= remThicknessInPx
         )
            return Math.round(resultPx);
         return resultPx;
      };
      const getLineThickness = (line, fullOrHalf) => {
         let resultPx = getLineThicknessPx(line);
         if (fullOrHalf === 'half') resultPx /= 2;
         if (!line.minThicknessPx)
            return `${convertPxToRem(resultPx)}rem`;
         return `${resultPx}px`;
      };
      
      const {prUISet} = this._parameters;
      const hLine = prUISet.structureLines.hLine;
      const vLine = prUISet.structureLines.vLine;
      
      return (
         `.rst__lineHalfHorizontalRight::before {
            height: ${getLineThickness(hLine)};
            transform: translateY(-50%);
            background-color: ${hLine.color};
         }
         .rst__lineFullVertical::after,
         .rst__lineHalfVerticalTop::after,
         .rst__lineHalfVerticalBottom::after,
         .rst__lineChildren::after {
            width: ${getLineThickness(vLine)};
            transform: translateX(-50%);
            background-color: ${vLine.color};
         }
         .rst__lineHalfVerticalTop::after {
             height: calc(50% + ${getLineThickness(hLine, 'half')});
         }`
      );
   }
   
   get _overrideCollapseAndExpandButtonsCSS() {
      const {prUISet} = this._parameters;
      const buttonSet = prUISet.expandCollapseButtons;
      const cbStates = buttonSet.common.states;
      
      const boxShadowCSS = (() => {
         let normalCSS = (
            `box-shadow: ${cbStates.normal.boxShadow.cssValue}; `
            + `-webkit-box-shadow: ${cbStates.normal.boxShadow.cssValue};`);
         
         let hoveredCSS = (
            `box-shadow: ${cbStates.hovered.boxShadow.cssValue}; `
            + `-webkit-box-shadow: ${cbStates.hovered.boxShadow.cssValue};`);
         
         let focusedCSS = (
            `box-shadow: ${cbStates.focused.boxShadow.cssValue}; `
            + `-webkit-box-shadow: ${cbStates.focused.boxShadow.cssValue};`);
         
         return {
            normal: normalCSS,
            hovered: hoveredCSS,
            focused: focusedCSS
         };
      })();
      
      return (
         `.rst__collapseButton {
            background-color: ${buttonSet.common.backgroundColor};
            background-image: ${
            buttonSet.collapse.backgroundImageCSSValue //
               .replace('{signColor}', buttonSet.collapse.signColor)
            };
         }
         .rst__expandButton {
            background-color: ${buttonSet.common.backgroundColor};
            background-image: ${
            buttonSet.expand.backgroundImageCSSValue //
               .replace('{signColor}', buttonSet.expand.signColor)
            };
         }
         .rst__collapseButton, .rst__expandButton {
            width: ${cbStates.normal.diameterRem}rem;
            height: ${cbStates.normal.diameterRem}rem;
            ${boxShadowCSS.normal}
         }
         .rst__collapseButton:hover, .rst__expandButton:hover {
            width: ${cbStates.hovered.diameterRem}rem;
            height: ${cbStates.hovered.diameterRem}rem;
            ${boxShadowCSS.hovered}
         }
         .rst__collapseButton:focus, .rst__expandButton:focus {
            ${boxShadowCSS.focused}
         }`
      );
   }
   
   get _overrideNavigationItemContainerCSS() {
      const {prUISet} = this._parameters;
      const container = prUISet.itemContainer;
      
      const paddingCSSValue =
         (pd => `${pd.top}rem ${pd.right}rem ` +
                `${pd.bottom}rem ${pd.left}rem`)(container.paddingRem);
      const borderCSSValue = (b =>
         `${b.cssStyle} ${b.color} ${b.thicknessRem}rem`)(container.border);
      
      return (
         `.rst__rowContents {
             min-width: 0;
             padding: ${paddingCSSValue};
             border: ${borderCSSValue};
             border-radius: ${container.borderRadiusRem}rem;
             box-shadow: ${container.boxShadow.cssValue};
             background-color: ${container.backgroundColor};
          }
          .rst__rowContentsDragDisabled {
             border-left: ${container.borderCSSValue};
          }
          .rst__rowLabel {
             padding-right: ${container.labelContainer.paddingRightRem}rem;
          }`
      );
   }
}
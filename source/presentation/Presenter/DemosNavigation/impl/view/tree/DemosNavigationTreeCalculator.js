/*
   Do NOT cache this,
   since props might change after construction of this class.
 */
export default class DemosNavigationTreeCalculator {
   constructor(treePrivateUISettings) {
      this._treePrivateUISettings = treePrivateUISettings;
   }
   
   get _parameters() {
      const prUISet = this._treePrivateUISettings;
      return ({prUISet});
   }
   
   get leftMarginRem() {
      const {prUISet} = this._parameters;
      const buttons = prUISet.expandCollapseButtons;
      const bStates = buttons.common.states;
      
      return (
         bStates.normal.diameterRem / 2
         + bStates.normal.boxShadow.maxThickness.leftRem
         - (prUISet.structureLines.blockWidthRem / 2 + Number.EPSILON)
         + prUISet.paddingRem.left
      );
   }
   
   get rightPaddingRem() {
      const {prUISet} = this._parameters;
      const ic = prUISet.itemContainer;
      
      return Math.max(0,
         ic.boxShadow.maxThickness.rightRem
         + ic.rstLabelContainer.marginRem.left
         + prUISet.paddingRem.right);
   }
   
   get itemContainerExtraWidthRem() {
      const {prUISet} = this._parameters;
      const ic = prUISet.itemContainer;
      
      return (
         2 * ic.border.thicknessRem
         + ic.paddingRem.left + ic.paddingRem.right
         + ic.boxShadow.maxThickness.rightRem
         + ic.rstLabelContainer.marginRem.left
         + ic.rstLabelContainer.paddingRightRem );
   }
}
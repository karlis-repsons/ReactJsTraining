// This only gives borders for those demos who want it
// and when demo fills the whole demo container.
export default function getContentBorderCSS(
   {
      borderSettings: brdSet, // DemoContainerBordersOfferedToDemo
      demoUISettings: deUISet,
      demoContainerPaddingRem: padPrRem,
   }
) {
   const getBorderPresenceAtSides = () => {
      let result = {top: false, right: false, bottom: false, left: false};
      if (deUISet.demoPreferences.wantsBorder === true) {
         result = {
            top: padPrRem.top < Number.EPSILON && brdSet.top,
            right: padPrRem.right < Number.EPSILON && brdSet.right,
            bottom: padPrRem.bottom < Number.EPSILON && brdSet.bottom,
            left: padPrRem.left < Number.EPSILON && brdSet.left
         };
      }
      return result;
   };
   
   const hasBorderAt = getBorderPresenceAtSides();
   
   let css = {};
   if (hasBorderAt.top)
      css.borderTop =
         `${brdSet.top.thicknessPx}px solid ${brdSet.top.color}`;
   if (hasBorderAt.right)
      css.borderRight =
         `${brdSet.right.thicknessPx}px solid ${brdSet.right.color}`;
   if (hasBorderAt.bottom)
      css.borderBottom =
         `${brdSet.bottom.thicknessPx}px solid ${brdSet.bottom.color}`;
   if (hasBorderAt.left)
      css.borderLeft =
         `${brdSet.left.thicknessPx}px solid ${brdSet.left.color}`;
   
   return css;
}
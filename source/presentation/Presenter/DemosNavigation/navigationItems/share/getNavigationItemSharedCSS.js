export default function getNavigationItemSharedCSS(connection) {
   const niShUISty = connection.settings.shared.navigationItem.ui.style;
   
   let css = {
      paddingTop: `${niShUISty.paddingRem.top}rem`,
      paddingRight: `${niShUISty.paddingRem.right}rem`,
      paddingBottom: `${niShUISty.paddingRem.bottom}rem`,
      paddingLeft: `${niShUISty.paddingRem.left}rem`
   };
   
   if (niShUISty.backgroundColor)
      css.backgroundColor = niShUISty.backgroundColor;
   
   const fontParameters = getFontParameters(connection);
   css.fontSize = fontParameters.fontSize;
   css.fontFamily = fontParameters.fontFamily;
   css.fontWeight = 'normal';
   
   return css;
}

// to be eliminated by the next version of connections
function getFontParameters(connection) {
   const shUISty = connection.settings.shared.ui.style;
   const niShUISty = connection.settings.shared.navigationItem.ui.style;
   
   let parameters = {};
   if (niShUISty.font) {
      if (niShUISty.font.sizeRem)
         parameters.fontSize = `${niShUISty.font.sizeRem}rem`;
      if (niShUISty.font.names)
         parameters.fontFamily = niShUISty.font.names;
   }
   if (!parameters.fontSize && typeof parameters.fontSize !== 'number')
      parameters.fontSize = `${shUISty.font.sizeRem}rem`;
   if (!parameters.fontFamily)
      parameters.fontFamily = shUISty.font.names;
   
   return parameters;
}

// TODO: is this usable for width prediction when text-decoration is used?
export function getFontCSSValue(connection) {
   const fp = getFontParameters(connection);
   const value = `${fp.fontSize} ${fp.fontFamily}`;
   
   return value;
}
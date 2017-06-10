import makeHexColorFromRGB from 'makeHexColorFromRGB_jGcSk';

export default function changeHexColorLightness(
    color, // e.g. F06D06 or #F06D06
    amount // [-255, 255]
) {
    let hasNumberSign = false;
    if (color[0] === '#') {
        color = color.slice(1);
        hasNumberSign = true;
    }
    const n = parseInt(color, 16);
    const red   = normalize( (n >> 16)           + amount );
    const green = normalize( ((n >> 8) & 0x00FF) + amount );
    const blue  = normalize( (n & 0x0000FF)      + amount );
    
    return (hasNumberSign ? '#' : '') + makeHexColorFromRGB(red, green, blue);
}

function normalize(decimalColorValue) {
    if (decimalColorValue > 255)
        return 255;
    if (decimalColorValue < 0)
        return 0;
    
    return decimalColorValue;
}

// started out from https://css-tricks.com/snippets/javascript/lighten-darken-color
// then heavily remade
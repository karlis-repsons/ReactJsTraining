export default function makeHexColorFromRGB(red, green, blue) {
    const twoHexDigits = (decimal) => {
        const str = decimal.toString(16);
        return str.length === 1 ? `0${str}` : str;
    };
    return twoHexDigits(red) + twoHexDigits(green) + twoHexDigits(blue);
}
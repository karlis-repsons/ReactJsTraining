export default function lengthStringFromStyle(
   style, lengthPropertyName
) {
   let input = style[lengthPropertyName];
   
   let result;
   if (typeof input === 'number')
      result = `${input}px`;
   else if (typeof input === 'string')
      result = input;
   
   return result;
}
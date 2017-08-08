import {ArgumentException} from 'exceptionTypes_mjS3d_v0';

export default function copyIfGiven({source, property, target}) {
   if (typeof source !== 'object' || !source)
      throw new ArgumentException('Got invalid source.');
   if (typeof property !== 'string' || !property)
      throw new ArgumentException('Missing property name.');
   if (typeof target !== 'object' || !target)
      throw new ArgumentException('Got invalid target.');
   
   if (source[property])
      target[property] = source[property];
}
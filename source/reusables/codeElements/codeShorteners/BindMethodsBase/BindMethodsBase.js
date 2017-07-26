/*
Usage:
   0. import BindMethodsBase or bindMethodsBaseExtends
      from BindMethodsBase_h436s.
   
   1.
      a) if your class does not have a base class:
         class YourClass extends BindMethodsBase { ... }
      
      b) otherwise:
         class YourClass extends bindMethodsBaseExtends(YourBase) { ... }
   
   2. bind methods:
      constructor() {
         super();
         this.bindMethods([this.yourMethod]);
      }
 */

import {InvalidOperationException} from 'exceptionTypes_mjS3d';

export class BindMethodsBase {
   bindMethods(arrayOfMethods) {
      bindMethods(this, arrayOfMethods);
   }
}

export function bindMethodsBaseExtends(Extensible) {
   return class extends Extensible {
      bindMethods(arrayOfMethods) {
         bindMethods(this, arrayOfMethods);
      }
   };
}

function bindMethods(target, arrayOfMethods) {
   const boundNamePrefix = 'bound ';
   for (const method of arrayOfMethods) {
      if (method.name.substring(0, boundNamePrefix.length) === boundNamePrefix)
         throw new InvalidOperationException(
            `Tried binding method with name: "${method.name}".`);
   
      target[method.name] = method.bind(target);
   }
}
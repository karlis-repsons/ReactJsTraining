/* eslint-disable no-console */
import { SystemException, ArgumentException } from 'exceptionTypes_mjS3d_v0';

function doTypeChecks() {
    const e0 = new SystemException('some system excn.');
    if (e0 instanceof Object) console.log('e0 instanceof Object');
    if (e0 instanceof Error) console.log('e0 instanceof Error');
    if (e0 instanceof SystemException) console.log('e0 instanceof SystemException');
    if (e0 instanceof ArgumentException === false) console.log('e0 instanceof ArgumentException === false');
    if (e0 instanceof Array === false) console.log('e0 instanceof Array === false');

    const e1 = new ArgumentException('arg excn.');
    if (e1 instanceof Object) console.log('e1 instanceof Object');
    if (e1 instanceof Error) console.log('e1 instanceof Error');
    if (e1 instanceof SystemException) console.log('e1 instanceof SystemException');
    if (e1 instanceof ArgumentException) console.log('e1 instanceof ArgumentException');
    if (e1 instanceof Array === false) console.log('e1 instanceof Array === false');
}

function throwToCheckStackTrace() {
    function a() {
    b();
    }
    function b() {
        c();
    }
    function c() {
        throw new ArgumentException();
    }

    a();
}

doTypeChecks();
throwToCheckStackTrace();
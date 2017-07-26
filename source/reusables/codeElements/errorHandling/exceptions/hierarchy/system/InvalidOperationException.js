import newExceptionType from 'newExceptionType_joEx3';
import { SystemException } from '../SystemException';
export const InvalidOperationException
   = newExceptionType('InvalidOperationException', SystemException);
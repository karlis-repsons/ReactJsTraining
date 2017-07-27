import merge from 'deepmerge';
import {ArgumentException} from 'exceptionTypes_mjS3d';

export default function getSharedSettingsForInput(settingsInput) {
   if (!settingsInput)
      throw new ArgumentException();
   
   let sharedSettings = {};
   
   if (settingsInput.share)
      sharedSettings = merge(sharedSettings, settingsInput.share);
   
   if (settingsInput.parentInput)
      sharedSettings = merge(sharedSettings,
         getSharedSettingsForInput(settingsInput.parentInput)
      );
   
   return sharedSettings;
}
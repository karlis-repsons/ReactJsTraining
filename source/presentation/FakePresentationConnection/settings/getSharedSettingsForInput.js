import merge from 'deepmerge';
import {ArgumentException} from 'exceptionTypes_mjS3d_v0';

export default function getSharedSettingsForInput(settingsInput) {
   if (!settingsInput)
      throw new ArgumentException();
   
   let sharedSettings = {};
   
   if (settingsInput.parentInput)
      sharedSettings = merge(sharedSettings,
         getSharedSettingsForInput(settingsInput.parentInput)
      );
   
   if (settingsInput.share)
      sharedSettings = merge(sharedSettings, settingsInput.share);
   
   return sharedSettings;
}
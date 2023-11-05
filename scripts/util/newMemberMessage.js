import { system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import Config from "../conf/Configuration";


export function welcome(playerid) {
   
  system.run(() => {
  let wel = new ActionFormData()
  .title(`★━━━━━━━━<§oBienvenido§r>━━━━━━━━★`)
  .body(
    `\n§rBienvenido a Untravel §d${playerid.nameTag}§r.
    \n    Esperamos y te la pases bien
    \n    cualquier bug o sugerencia reportar
    \n    a support@untravelmx.com...
    \n`
  )
  .button(`Ok`);


  wel.show(playerid).then((result) => {
    
    if (result.canceled) {
      welcome(playerid)
    } else {
     console.log("Your result was: " + result.selection);
     playerid.addTag(Config.normalMemberTag);
  }
})
})}







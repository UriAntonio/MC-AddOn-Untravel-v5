import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import Server from "../server";
import { Log } from "../Modules/Log/Log";

/**
 * 
 * @param {Player} playerid 
 */
export function welcome(playerid) {

  Server.System.run(() => {
    let wel = new ActionFormData()
      .title(`§d★━━━━━━━━<§oBienvenido§r§d>━━━━━━━━★`)
      .body(
        `\n§rBienvenido de nuevo a Untravel
    \n    §d${playerid.nameTag}§r.
    \n    Esperamos y te la pases bien
    \n    cualquier error o sugerencia
    \n    acércate a nosotros en:
    \n    support@untravelmx.com`
      )
      .button(`§dA Jugar!`);


    wel.show(playerid).then((result) => {

      if (result.canceled) {
        welcome(playerid)
      } else {
        //Log("Your result was: " + result.selection);
        playerid.runCommandAsync(`playsound random.levelup @s`)
        
      }
    })
  })
}







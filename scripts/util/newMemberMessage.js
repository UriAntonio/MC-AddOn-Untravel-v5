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
      .title(`§5★━━━━━━━━<§o§lBienvenido§r§5>━━━━━━━━★`)
      .body(
        `\n§rBienvenido de nuevo a §l§dUntravel§6Mx
    \n    §5${playerid.nameTag}§r.
    \n    Esperamos y te la pases bien
    \n    cualquier error o sugerencia
    \n    acércate a nosotros en:
    \n    §bsupport@untravelmx.com`
      )
      .button(`§d§lA Jugar!`);


    wel.show(playerid).then((result) => {

      if (result.canceled) {
        welcome(playerid)
      } else {
        //Log("Your result was: " + result.selection);
        playerid.runCommandAsync(`playsound random.levelup @s`)
        Server.sendMsgToPlayer(playerid, `§bBienvenido §9${playerid.name}`)
        
      }
    })
  })
}







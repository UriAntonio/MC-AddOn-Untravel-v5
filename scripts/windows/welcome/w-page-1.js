import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import Untravel from "../../Untravel";
import Config from "../../Commands/Configuration";




/**
 * 
 * @param {Player} playerid 
 */
export function guia(playerid, gamemode) {
    const gm = gamemode
    Untravel.System.run(() => {

      let wel = new ActionFormData()
        .title(`§5§oBienvenido`)
        .body(
          `§fBienvenido a §l§dUntravel§6Mx\n§5${playerid.name}§r§f.\nEsperamos y te la pases bien. \nSiéntete como en casa \nSe parte o crea tu propia comunidad libremente\nCualquier error o sugerencia acércate a nosotros en:`
          + `\n§bsupport@untravelmx.com`
          + `\n§fNuestro discord es:`
          +`\n§dhttps://discord.gg/yNZBAgAC`
        )
        .button(`§d§l>>`)
  
      wel.show(playerid).then((result) => {
        playerid.runCommandAsync(`gamemode spectator @s`)
        if (result.canceled) {
          guia(playerid, gamemode)
        } else {
          
            playerid.playSound(`item.book.page_turn`)
            //playerid.playSound(`random.anvil_use`)
            //guia2(playerid, gm)
        }
      })
    })
  }
  
  
  
  
  
  
  
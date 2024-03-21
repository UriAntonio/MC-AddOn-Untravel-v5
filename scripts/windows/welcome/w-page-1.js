import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import Untravel from "../../Untravel";
import Config from "../../Commands/Configuration";
import { signos } from "./w-page-2";




/**
 * 
 * @param {Player} playerid 
 */
export function guia(playerid, gamemode, l) {
    const gm = gamemode
    Untravel.System.run(() => {

      let wel = new ActionFormData()
        .title(`§5§oBienvenido`)
        .body(
          `§fBienvenido a §l§dUntravel§6Mx\n§5${playerid.name}§r§f.\n\nEsperamos y te la pases bien. \n\nSiéntete como en casa \n\nSe parte o crea tu propia comunidad libremente\n`
        )
        .button(`§d§l>>`)
  
      wel.show(playerid).then((result) => {
        playerid.runCommandAsync(`gamemode spectator @s`)
        if (result.canceled) {
          guia(playerid, gamemode, l)
        } else {
          signos(playerid, gm, l)
        }
      })
    })
  }
  

  export function welcome(playerid, gamemode, l) {
    const gm = gamemode
    Untravel.System.run(() => {

      let wel = new ActionFormData()
        .title(`§5§oBienvenido`)
        .body(
          `§fBienvenido de nuevo a §l§dUntravel§6Mx\n§5${playerid.name}§r§f.\n`
        )
        .button(`§d§l>>`)
        .button(`§e§lGUIA`)
  
      wel.show(playerid).then((result) => {
        playerid.runCommandAsync(`gamemode spectator @s`)
        if (result.canceled) {
          welcome(playerid, gm, l)
        } 
        if (result.selection == 0) {
            playerid.runCommandAsync(`gamemode ${gm}`)
        }
        if (result.selection == 0) {
          guia(playerid, gm, l)
        }
      })
    })
  }
  
  
  
  
  
  
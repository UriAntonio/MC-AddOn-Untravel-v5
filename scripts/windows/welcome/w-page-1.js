import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import Untravel from "../../Untravel";
import Config from "../../Commands/Configuration";
import { signos } from "./w-page-2";




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
          `§fBienvenido a §l§dUntravel§6Mx\n§5${playerid.name}§r§f.\nEsperamos y te la pases bien. \nSiéntete como en casa \nSe parte o crea tu propia comunidad libremente`
        )
        .button(`§d§l>>`)
  
      wel.show(playerid).then((result) => {
        playerid.runCommandAsync(`gamemode spectator @s`)
        if (result.canceled) {
          guia(playerid, gamemode)
        } else {
            signos(playerid, gm)
        }
      })
    })
  }
  

  export function welcome(playerid, gamemode) {
    const gm = gamemode
    Untravel.System.run(() => {

      let wel = new ActionFormData()
        .title(`§5§oBienvenido`)
        .body(
          `§fBienvenido de nuevo a §l§dUntravel§6Mx\n§5${playerid.name}§r§f.`
        )
        .button(`§d§l>>`)
        .button(`§e§lGUIA`)
  
      wel.show(playerid).then((result) => {
        playerid.runCommandAsync(`gamemode spectator @s`)
        if (result.canceled) {
          welcome(playerid, gm)
        } 
        if (result.selection == 0) {
            playerid.runCommandAsync(`gamemode ${gm}`)
        }
        if (result.selection == 0) {
          guia(playerid, gm)
        }
      })
    })
  }
  
  
  
  
  
  
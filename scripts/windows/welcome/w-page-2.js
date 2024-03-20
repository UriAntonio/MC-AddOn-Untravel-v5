import { Player } from "@minecraft/server"
import Untravel from "../../Untravel"
import { ActionFormData } from "@minecraft/server-ui"



/**
 * 
 * @param {Player} playerid 
 */
export function signos(playerid, gamemode) {
    const gm = gamemode
    Untravel.System.run(() => {

      let wel = new ActionFormData()
        .title(`§5§oSeñales`)
        .body(
          `§fPor favor recuerda las señales\n`
          +`\n§l§d>> §r§fsiguente/next`
          +`\n§l§d<<  §r§fatras/back`
          +`\n§l§b<<*>>  §r§faceptar/ok`
          +`\n§l§c>><<  §r§fcancelar/not`
        )
        .button(`§d§l>>`)
        
  
      wel.show(playerid).then((result) => {
        if (result.canceled) {
          signos(playerid, gamemode)
        }
        else {
            playerid.runCommandAsync(`gamemode ${gamemode}`)
            
            links(playerid, gm)
        }
      })
    })
  }



  /**
 * 
 * @param {Player} playerid 
 */
export function links(playerid, gamemode) {
    const gm = gamemode
    Untravel.System.run(() => {

      let wel = new ActionFormData()
        .title(`§5§oLinks`)
        .body(
          `Cualquier error o sugerencia acércate a nosotros en:`
          + `\n§bsupport@untravelmx.com`
          + `\n§fUnete nuestro discord en:`
          +`\n§dhttps://discord.gg/yNZBAgAC`
        )
        .button(`§d§l>>`)
        
  
      wel.show(playerid).then((result) => {

        if (result.canceled) {
          links(playerid, gamemode)
        }
        else {
            playerid.runCommandAsync(`gamemode ${gamemode}`)
            
            //guia2(playerid, gm)
        }
      })
    })
  }
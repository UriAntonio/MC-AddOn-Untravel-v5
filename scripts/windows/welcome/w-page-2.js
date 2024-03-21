import { Player } from "@minecraft/server"
import Untravel from "../../Untravel"
import { ActionFormData } from "@minecraft/server-ui"



/**
 * 
 * @param {Player} playerid 
 */
export function signos(playerid, gamemode, l) {
    const gm = gamemode
    Untravel.System.run(() => {

      let wel = new ActionFormData()
        .title(`§5§oSeñales`)
        .body(
          `§fPor favor recuerda las señales\n\n`
          +`\n§l§d>> §r§fsiguente/next\n`
          +`\n§l§d<<  §r§fatras/back\n`
          +`\n§l§b<<*>>  §r§faceptar/ok\n`
          +`\n§l§c>><<  §r§fcancelar/not\n`
        )
        .button(`§d§l>>`)
        
  
      wel.show(playerid).then((result) => {
        if (result.canceled) {
          signos(playerid, gamemode, l)
        }
        else {
            playerid.runCommandAsync(`gamemode ${gamemode}`)
            
            links(playerid, gm, l)
        }
      })
    })
  }



  /**
 * 
 * @param {Player} playerid 
 */
export function links(playerid, gamemode, l) {
    const gm = gamemode
    Untravel.System.run(() => {

      let wel = new ActionFormData()
        .title(`§5§oLinks`)
        .body(
          `Cualquier error o sugerencia acércate a nosotros en:`
          + `\n§bsupport@untravelmx.com\n`
          + `\n§fUnete nuestro discord en:`
          +`\n§dhttps://discord.gg/yNZBAgAC\n`
        )
        .button(`§d§l>>`)
        
  
      wel.show(playerid).then((result) => {

        if (result.canceled) {
          links(playerid, gamemode, l)
        }
        else {
            playerid.runCommandAsync(`gamemode ${gamemode}`)
            playerid.teleport(l)
            
        }
      })
    })
  }
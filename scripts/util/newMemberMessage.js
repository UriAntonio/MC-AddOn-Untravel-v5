import { Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import Server from "../server";
import { Log } from "../Modules/Log/Log";
import Config from "../conf/Configuration";

const anuncio = true

function updateAnuncio(playerid) {

  Server.System.run(() => {
    
    let upd = new ActionFormData()
      .title(`§2§lUpdate`)
      .body(`§rActualizacion §l§gV.1.0.0 §6Finance§r` 
      + `     Saludos soy §l§eKlarixMx§r me alegra que sigas aquí. `
      + `En esta actualizacion te traigo:`
      + `\n§l§2Comandos Personalizados§r`
      + `   §6  -cash (-cartera, -money -balance)§r`
      + `     Este comando te muetra tu dinero actual`
      + `\n§l§2Recompensas por Farmeo§r   `
      + `      Ahora los mobs te dan cierta cantidad de dinero de forma aleatoria entre mas peligroso mas dinero`
      )
      .button(`§a§lJuguemos!`);


    upd.show(playerid).then((result) => {

      if (result.canceled) {
        updateAnuncio(playerid)
      } else {
          playerid.runCommandAsync(`playsound random.levelup @s`)
          playerid.runCommandAsync(`gamemode s @s[tag=!${Config.AdminTag}]`)
      }
    })
  })
}








/**
 * 
 * @param {Player} playerid 
 */
export function welcome(playerid) {

  Server.System.run(() => {
    playerid.runCommandAsync(`gamemode spectator @s`)
    let wel = new ActionFormData()
      .title(`§5★━━━━━━━━<§o§lBienvenido§r§5>━━━━━━━━★`)
      .body(
        `\n§rBienvenido de nuevo a §l§dUntravel§6Mx`
        +`\n    §5${playerid.nameTag}§r.`
        +`\nEsperamos y te la pases bien`
        +` cualquier error o sugerencia`
        +` acércate a nosotros en:`
        +`\n    §bsupport@untravelmx.com`
      )
      .button(`§d§lA Jugar!`)
      .button(`§l§eNuevo Contenido!`)


    wel.show(playerid).then((result) => {

      if (result.canceled) {
        welcome(playerid)
      } else {
        if(result.selection == 1){
          playerid.runCommandAsync(`playsound random.levelup @s`)
          Server.sendMsgToPlayer(playerid, `§bBienvenido §9${playerid.name}`)
          playerid.runCommandAsync(`playsound random.anvil_use @s`)
          updateAnuncio(playerid)
        } else {
          playerid.runCommandAsync(`playsound random.levelup @s`)
          Server.sendMsgToPlayer(playerid, `§bBienvenido §9${playerid.name}`)
          playerid.runCommandAsync(`gamemode s @s[tag=!${Config.AdminTag}]`)
        }
      }
    })
  })
}







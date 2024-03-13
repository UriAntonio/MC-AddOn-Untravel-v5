import { Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import Untravel from "../Untravel";
import Config from "../Commands/Configuration";
import { guia } from "./w-page-1";
//import { Log } from "../Modules/Log/Log";

const versionList = [
  "V1-0-0",
  "V1-0-1",
  "V1-0-2",
  //"V1-0-3",

]

const Updates = {
  0: function updateAnuncio_0(playerid, gamemode) {
    Untravel.System.run(() => {
      let upd = new ActionFormData()
        .title(`§2Update`)
        .body(`§fActualizacion §l§gV.1.0.0 §6Finance§r§f\nSaludos soy §l§eKlarixMx§r§f gracias por tu tiempo.\nEn esta actualizacion te traigo:\n§l§2Comandos Personalizados§r§f\n   §6-cash (-cartera, -money -balance)§f\n     Este comando te muetra tu dinero actual\n§l§2Recompensas por Farmeo§r§f\nLos mobs te dan cierta cantidad de dinero de forma aleatoria entre mas peligroso mas dinero`)
        .button(`§a§lJuguemos!`)
        .button(`§f§lRegresar!`)
      upd.show(playerid).then((result) => {
        if (result.canceled) {
          versiones(playerid, gamemode)
        } if (result.selection == 0) {
          playerid.runCommandAsync(`playsound random.levelup @s`)
          playerid.runCommandAsync(`gamemode ${gamemode}`)
        }
        if (result.selection == 1) {
          versiones(playerid, gamemode)
          playerid.runCommandAsync(`playsound random.levelup @s`)
          playerid.runCommandAsync(`gamemode ${gamemode}`)
        }
      })
    })
  },
  1: function updateAnuncio_1(playerid, gamemode) {
    Untravel.System.run(() => {
      let upd = new ActionFormData()
        .title(`§2Update`)
        .body(`§fActualizacion §l§gV.1.0.1 §6General7r§f`
          + `\nSaludos soy §l§eKlarixMx§r§f\ngracias por tu tiempo. `
          + `\nEn esta actualizacion te traigo:`
          + `\n§l§2Comandos Personalizados§r§f`
          + `\n§6-help (-h)§f`
          + `\nCon este puedes ver los detalles de cada comando`
          + `\n§6-tps §f`
          + `\nCheca los Ticks por segundo del Servidor`
          + `\n§6-playerlist (-playerson, -players, -pl)§f`
          + `\nVe la lsita de jugadores y su tiempo de conexion actual`
        )
        .button(`§a§lJuguemos!`)
        .button(`§0§lRegresar!`)
      upd.show(playerid).then((result) => {
        if (result.canceled) {
          versiones(playerid, gamemode)
        }
        if (result.selection == 0) {
          playerid.runCommandAsync(`playsound random.levelup @s`)
          playerid.runCommandAsync(`gamemode ${gamemode}`)
        }
        if (result.selection == 1) {
          versiones(playerid, gamemode)
          playerid.runCommandAsync(`playsound random.levelup @s`)
          playerid.runCommandAsync(`gamemode ${gamemode}`)
        }
      })
    })
  },
  2: function updateAnuncio_2(playerid, gamemode) {
    Untravel.System.run(() => {
      let upd = new ActionFormData()
        .title(`§2Update`)
        .body(`§fActualizacion §l§gV.1.0.2 §6Home§f`
          + `\n§l§2Comandos Personalizados§f`
          + `\n   §6-home (-hm)§f`
          + `\n      Comando para teletransportarte a tus hogares $$$poco`
          + `\n   §6-sethome (-sh)§f`
          + `\n      Agrega un home con nombre personalizado $$$mucho`
          + `\n   §6-delhome (-dhome, -dh)§f`
          + `\n      borra o remueve un home $te rembolsa la midad del $$`
          + `\n   §6-listhome (-homelist, -homes, -lh)§f`
          + `\n      Muestra todos tus home`
        )
        .button(`§a§lJuguemos!`)
        .button(`§0§lRegresar!`)
      upd.show(playerid).then((result) => {
        if (result.canceled) {
          versiones(playerid, gamemode)
        } if (result.selection == 0) {
          playerid.runCommandAsync(`playsound random.levelup @s`)
          playerid.runCommandAsync(`gamemode ${gamemode}`)
        }
        if (result.selection == 1) {
          versiones(playerid, gamemode)
          playerid.runCommandAsync(`playsound random.levelup @s`)
          playerid.runCommandAsync(`gamemode ${gamemode}`)
        }
      })
    })
  },
  3: function updateAnuncio_3(playerid, gamemode) {
    Untravel.System.run(() => {
      let upd = new ActionFormData()
        .title(`§2§Update`)
        .body(`§fActualizacion §l§gV.1.0.3 §6Finance§f`
          + `\n§l§2Comandos Personalizados§f`
          + `\n   §6-pay (-pagar, -p)§f`
          + `\n      Hacer transferencias o pagar a otro jugador`
          + `\n   §6-topmoney (-topbal, -topcartera, -topbalance, -tm)§f`
          + `\n      Mira la table de posicion de dinero`
          + `\n   §6-delhome (-dhome, -dh)§f`
          + `\n      borra o remueve un home $te rembolsa la midad del $$`
          + `\n   §6-listhome (-homelist, -homes, -lh)§f`
          + `\n      Muestra todos tus home`
        )
        .button(`§a§lJuguemos!`)
        .button(`§0§lRegresar!`)
      upd.show(playerid).then((result) => {
        if (result.canceled) {
          versiones(playerid, gamemode)
        }
        if (result.selection == 0) {
          playerid.runCommandAsync(`playsound random.levelup @s`)
          playerid.runCommandAsync(`gamemode ${gamemode}`)
        }
        if (result.selection == 1) {
          versiones(playerid, gamemode)
          playerid.runCommandAsync(`playsound random.levelup @s`)
          playerid.runCommandAsync(`gamemode ${gamemode}`)
        }
      })
    })
  },
  4: null
}



function versiones(player, gamemode) {
  Untravel.System.run(() => {
    let num = -1
    let ver = new ActionFormData()
      .title(`§5§oVersiones`)
      .body(`   §dAqui puedes ver los cambios y agregados en cada version`)
    versionList.forEach(version => {
      ver.button(`§0§l${version}`)
      num++
    })

    ver.show(player).then((result) => {
      if (result.canceled) {
        welcome(player, gamemode)
      }
      else {
        let selection = result.selection
        Updates[selection](player, gamemode)
        player.runCommandAsync(`playsound mob.shulker.open @s`)
      }
    })
  })
}









/**
 * 
 * @param {Player} playerid 
 */
export function welcome(playerid, gamemode) {
  const gm = gamemode
  Untravel.System.run(() => {

    //Log(`§e${playerid.name}§f esta en  ${gm}`)
    let wel = new ActionFormData()
      .title(`§5§oBienvenido`)
      .body(
        `§fBienvenido de nuevo a §l§dUntravel§6Mx\n§5${playerid.name}§r§f.\nEsperamos y te la pases bien. \nSiéntete como en casa \nSe parte o crea tu propia comunidad libremente\nEsperamos y te la pases bien cualquier error o sugerencia acércate a nosotros en:`
        + `\n§bsupport@untravelmx.com`
        + `\n§fNuestro discord es:`
        + `\n§dhttps://discord.gg/yNZBAgAC`
      )
      .button(`§d§lA Jugar!`)
      .button(`§l§bGuía`)

    wel.show(playerid).then((result) => {
      playerid.runCommandAsync(`gamemode spectator @s`)
      if (result.canceled) {
        welcome(playerid, gamemode)
      } else {
        if (result.selection == 1) {
          playerid.sendMessage(`${Config.serverStyler}§3Bienvenido §b${playerid.name}`)
          playerid.playSound(`item.book.page_turn`)
          guia(playerid, gm)
        } else {
          playerid.runCommandAsync(`playsound random.levelup @s`)
          playerid.sendMessage(`${Config.serverStyler}§3Bienvenido §b${playerid.name}`)
          playerid.runCommandAsync(`gamemode ${gm}`)
        }
      }
    })
  })
}







import { Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import Untravel from "../Untravel";
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
        .title(`§2§lUpdate`)
        .body(`§rActualizacion §l§gV.1.0.0 §6Finance§r`
          + `\n     Saludos soy §l§eKlarixMx§r me alegra que sigas aquí. `
          + `\nEn esta actualizacion te traigo:`
          + `\n§l§2Comandos Personalizados§r`
          + `\n   §6-cash (-cartera, -money -balance)§r`
          + `\n     Este comando te muetra tu dinero actual`
          + `\n§l§2Recompensas por Farmeo§r   `
          + `\n      Ahora los mobs te dan cierta cantidad de dinero de forma aleatoria entre mas peligroso mas dinero`
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
  1: function updateAnuncio_1(playerid, gamemode) {
    Untravel.System.run(() => {
      let upd = new ActionFormData()
        .title(`§2§lUpdate`)
        .body(`§rActualizacion §l§gV.1.0.1 §6General§r`
          + `\n     Saludos soy §l§eKlarixMx§r me alegra que sigas aquí. `
          + `\nEn esta actualizacion te traigo:`
          + `\n§l§2Comandos Personalizados§r`
          + `\n   §6-help (-h)§r`
          + `\n     Con este puedes ver los detalles de cada comando`
          + `\n   §6-tps §r`
          + `\n      Checa los Ticks por segundo del Servidor`
          + `\n   §6-playerlist (-playerson, -players, -pl)§r`
          + `\n      Ve la lsita de jugadores y su tiempo de conexion actual`
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
        .title(`§2§lUpdate`)
        .body(`§rActualizacion §l§gV.1.0.2 §6Home§r`
          + `\n§l§2Comandos Personalizados§r`
          + `\n   §6-home (-hm)§r`
          + `\n      Comando para teletransportarte a tus hogares $$$poco`
          + `\n   §6-sethome (-sh)§r`
          + `\n      Agrega un home con nombre personalizado $$$mucho`
          + `\n   §6-delhome (-dhome, -dh)§r`
          + `\n      borra o remueve un home $te rembolsa la midad del $$`
          + `\n   §6-listhome (-homelist, -homes, -lh)§r`
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
        .title(`§2§lUpdate`)
        .body(`§rActualizacion §l§gV.1.0.3 §6Finance§r`
          + `\n§l§2Comandos Personalizados§r`
          + `\n   §6-pay (-pagar, -p)§r`
          + `\n      Hacer transferencias o pagar a otro jugador`
          + `\n   §6-topmoney (-topbal, -topcartera, -topbalance, -tm)§r`
          + `\n      Mira la table de posicion de dinero`
          + `\n   §6-delhome (-dhome, -dh)§r`
          + `\n      borra o remueve un home $te rembolsa la midad del $$`
          + `\n   §6-listhome (-homelist, -homes, -lh)§r`
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
      .title(`§5★━━━━━━━━<§o§lVersiones§r§5>━━━━━━━━★`)
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

    //Log(`§e${playerid.name}§r esta en  ${gm}`)
    let wel = new ActionFormData()
      .title(`§5★━━━━━━━━<§o§lBienvenido§r§5>━━━━━━━━★`)
      .body(
        `\n§rBienvenido de nuevo a §l§dUntravel§6Mx`
        + `\n§5${playerid.nameTag}§r.`
        + `\nEsperamos y te la pases bien`
        + ` cualquier error o sugerencia`
        + ` acércate a nosotros en:`
        + `\n    §bsupport@untravelmx.com`
      )
      .button(`§d§lA Jugar!`)
      .button(`§l§eNuevo Contenido!`)

    wel.show(playerid).then((result) => {
      playerid.runCommandAsync(`gamemode spectator @s`)
      if (result.canceled) {
        welcome(playerid, gamemode)
      } else {
        if (result.selection == 1) {
          playerid.runCommandAsync(`playsound random.levelup @s`)
          playerid.sendMessage(`§a■§3Bienvenido §b${playerid.name}`)
          playerid.runCommandAsync(`playsound random.anvil_use @s`)
          versiones(playerid, gm)
        } else {
          playerid.runCommandAsync(`playsound random.levelup @s`)
          playerid.sendMessage(`§a■§3Bienvenido §b${playerid.name}`)
          playerid.runCommandAsync(`gamemode ${gm}`)
        }
      }
    })
  })
}







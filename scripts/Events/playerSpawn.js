import { onJoinData } from "../Modules/Data/onJoinData.js";
import { welcome } from "../util/newMemberMessage.js";
import Config from "../conf/Configuration.js";
import Untravel from "../Untravel.js";
import { Log, LogWarn } from "../Modules/Log/Log.js";
import { Player } from "@minecraft/server";

const BanDB = Untravel.BanDB

function rankFilter(player) {
  let tags = player.getTags()
  let rank
  for (const tag of tags) {
    if (tag.startsWith("Rank:")) {
      staffTag = tag
    }
    if (tag.startsWith("Rank:")) {
      rank = tag
      Config.ranks.staff.list
      addtag = tag + "--"
    }
}


  if (player.isAdmin()) {
    player.addTag("Rank:§l§b★★★★★★★")
  }
}



/**
 * 
 * @param {Player} player 
 */
function onJoinSpawn(player) {
  try {
    player.runCommandAsync(`testfor @s`);

    // Bloquea el Untravel si esta en true
    if (Config.lockServer) {
      let reason = "Bajo Mantenimiento! Perdón por las molestias.";
      try {
        // Kick a los jugadores del Untravel
        player.runCommandAsync(`kick ${JSON.stringify(player.name)} ${reason}`);
      } catch (error) {
        // Despawn players from Untravel
        player.triggerEvent("minecraft:kick");
      }
    }
    if (player.isAdmin()) {
      if (!player.hasTag("Rank:§l§b★★★★★★★")) {
        player.addTag("Rank:§l§b★★★★★★★")
      }
      if (!player.hasTag("Notify")) {
        player.addTag("Notify")
      }
      
      
    }
    let gamemode
    //player.runCommandAsync(`gamemode s @s[tag=!${Config.AdminTag}]`)
    //Verificamos el modo de juego del jugador
    gamemode = player.gamemode
    if (!player.isAdmin()) {
      gamemode = "survival"
    }
    welcome(player, gamemode);
    Log(`[ 000 ]§b${player.name}§7 se unió al servidor ${Date()} | gm:  ${gamemode}`)
    // Ejecutanos cada comando en la lista
    for (let i = 0; i < onJoinData.length; i++) {
      try {
        player.runCommandAsync(`${onJoinData[i]}`);
      } catch (error) { }
    }
  } catch (error) { LogWarn(`§cError al unirse: ${player} | ${error}`) }
}

Untravel.world.afterEvents.playerSpawn.subscribe((loaded) => {
  // Toma el nombre del jugador que se esta uniendo
  let player = loaded.player;
  // Ejecuta la funcion con el tick event
  if (loaded.initialSpawn) {
    //Verificacion de Baneo
    if (BanDB.has(player.name)) {
      
      let banData = BanDB.get(player.name)
      if (!banData.duration) return player.kick(`\n§l§cFUISTE BANNEADO!\n§bRazon:§r ${banData.reason}\n§eBanned Por:§r ${banData.by}\n§6Si piensas que hubo un error\ncomunicate a §bsupport@untravelmx.com  §r`)
      if (Date.now() > banData.duration) {
        BanDB.delete(player.name)
      } else {
        return player.kick(`\n§l§cFUISTE BANNEADO!\n§bRazon:§r ${banData.reason} \n§r\n§eBanned Por:§r${banData.by} \n§cDuration : §e${Utility.formatTextFutureDate(banData.duration)}`)
      }
    }
    Untravel.PlayerOnline[player.name] = Date.now()
    Untravel.System.run(() => {
      onJoinSpawn(player);
    });

  } else {
    if ((Untravel.Setting.get("backSystem") ?? true) == false) return
    //player.sendMessage(`§eYou died. use §a!back§e to teleport to your death location.`)
  }

});


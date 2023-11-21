import { onJoinData } from "../Modules/Data/onJoinData.js";
import { welcome } from "../util/newMemberMessage.js";
import Config from "../conf/Configuration.js";
import Server from "../server.js";
import { Log, LogWarn } from "../Modules/Log/Log.js";
import { Player } from "@minecraft/server";


/**
 * 
 * @param {Player} player 
 */
function onJoinSpawn(player) {
  try {
    player.runCommandAsync(`testfor @s`);
   
    // Bloquea el server si esta en true
    if (Config.lockServer) {
      let reason = "Bajo Mantenimiento! Perdón por las molestias.";
      try {
        // Kick a los jugadores del server
        player.runCommandAsync(`kick ${JSON.stringify(player.name)} ${reason}`);
      } catch (error) {
        // Despawn players from server
        player.triggerEvent("minecraft:kick");
      }
    }
    let gamemode
    player.runCommandAsync(`gamemode s @s[tag=!${Config.AdminTag}]`)
    //Verificamos el modo de juego del jugador
    gamemode = player.gamemode
    if (!player.hasTag(Config.AdminTag)) {
      gamemode = "survival"
    }
    welcome(player, gamemode);
    Log(`§b${player.name}§7 se unió al servidor ${Date()} | gm:  ${gamemode}`)
    // Ejecutanos cada comando en la lista
    for (let i = 0; i < onJoinData.length; i++) {
      try {
        player.runCommandAsync(`${onJoinData[i]}`);
      } catch (error) { }
    }
  } catch (error) { LogWarn(`§cError al unirse: ${player} | ${error}`) }
}

Server.world.afterEvents.playerSpawn.subscribe((loaded) => {
  // Toma el nombre del jugador que se esta uniendo
  let player = loaded.player;
  // Ejecuta la funcion con el tick event
  if (loaded.initialSpawn) {
    Server.PlayerOnline[player.name] = Date.now()
    Server.System.run(() => {
      onJoinSpawn(player);
    });

  } else {
    //player.sendMessage(`§eYou died. use §a!back§e to teleport to your death location.`)
  }

});


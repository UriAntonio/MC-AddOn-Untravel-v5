import { onJoinData } from "../Modules/Data/onJoinData";
import { welcome } from "../util/newMemberMessage.js";
import Config from "../conf/Configuration.js";
import Server from "../server.js";
import { Log } from "../Modules/Log/Log.js";


function onJoinSpawn(player) {
  try {
    player.runCommandAsync(`testfor @s`);
    // Bloquea el server si esta en true
    if (Config.lockServer) {
      let reason = "Bajo Mantenimiento! Perdón por las molestias.";
      try {
        // Kick a los jugadores del server
        player.runCommand(`kick ${JSON.stringify(player.name)} ${reason}`);
      } catch (error) {
        // Despawn players from server
        player.triggerEvent("minecraft:kick");
      }
    }
    //Verificamos si el jugador es miembro nuevo
      const gamemode = player.gamemode
      Log(`§e${player.name}§r esta en  ${gamemode}`)
      welcome(player, gamemode);
      Log(`§e${player.name}§r se unió al servidor ${Date()}`)
    // Ejecutanos cada comando en la lista
    for (let i = 0; i < onJoinData.length; i++) {
      try {
        player.runCommandAsync(`${onJoinData[i]}`);
      } catch (error) {}
    }
    check = true;
  } catch (error) { Log(`§cError al unirse: ${player} | ${error}`)}
}

  Server.world.afterEvents.playerSpawn.subscribe((loaded) => {
    // Toma el nombre del jugador que se esta uniendo
    let player = loaded.player;
    // Ejecuta la funcion con el tick event
    if (loaded.initialSpawn) {
      Server.PlayerOnline[player.name] = Date.now()
      Server.System.run(async () => {
        onJoinSpawn(player);
      });
      
    } else {
      //player.sendMessage(`§eYou died. use §a!back§e to teleport to your death location.`)
    }
    
  });


import { world, system } from "@minecraft/server";
import { onJoinData } from "../modules/onJoinData.js";
import { welcome } from "../util/newMemberMessage.js";
import Config from "../conf/Configuration.js";

//const tickEventCallback = system.runInterval;
let check = false;
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
    if (!player.hasTag("online")) {
      welcome(player);
    }
    // Ejecutanos cada comando en la lista
    for (let i = 0; i < onJoinData.length; i++) {
      try {
        player.runCommandAsync(`${onJoinData[i]}`);
      } catch (error) {}
    }
    check = true;
  } catch (error) {}
  if (check) {
    check = false;
  }
}

export const onJoin = () => {
  world.afterEvents.playerSpawn.subscribe((loaded) => {
    // Toma el nombre del jugador que se esta uniendo
    let player = loaded.player;
    let callback;
    // Ejecuta la funcion con el tick event
    system.run(async () => {
      onJoinSpawn(player);
    });
  });
};

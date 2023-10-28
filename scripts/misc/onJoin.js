import { world, system } from "@minecraft/server";
import { onJoinData } from "../modules/onJoinData.js";
import { welcome } from "../util/newMemberMessage";

//const tickEventCallback = system.runInterval;
let check = false;
function onJoinSpawn(player) {
  try {
    // Loop until player is detected in the world
    player.runCommandAsync(`testfor @s`);
    // Lock down the server if enabled
    // if (lockdownBoolean) {
    //     let reason = "Under Maintenance! Sorry for the inconvenience.";
    //     try {
    //         // Kick players from server
    //         player.runCommand(`kick ${JSON.stringify(player.name)} ${reason}`);
    //     }
    //     catch (error) {
    //         // Despawn players from server
    //        //player.triggerEvent("minecraft:kick");
    //     }
    //     return tickEventCallback.unsubscribe(callback);
    // }
    // We execute each command in the list
    if (!player.hasTag("online")) {
      player.runCommandAsync(
        `replaceitem entity @s slot.hotbar 0 mx:new 1 0 {"minecraft:item_lock":{"mode":"lock_in_slot"},"minecraft:keep_on_death":{}}`
      );
    }
    for (let i = 0; i < onJoinData.length; i++) {
      try {
        player.runCommandAsync(`${onJoinData[i]}`);
        //player.runCommandAsync(`say ${i}`);
      } catch (error) {}
    }
    // Unsubscribe if disabled in-game

    // if (illegalItemsABoolean === false) {
    //     let allPlayers = [...World.getPlayers()];
    //     for (let player of allPlayers) {
    //         if (player.hasTag("illegalitemsA")) {
    //             player.removeTag("illegalitemsA");
    //         }
    //     }
    // }

    // Set up custom tag
    // tagRank(player);
    // Set up custom prefix
    //getPrefix(player);
    check = true;
  } catch (error) {}
  if (check) {
    check = false;
  }
}

export const onJoin = () => {
  world.afterEvents.playerSpawn.subscribe((loaded) => {
    // Get the name of the player who is joining
    let player = loaded.player;
    let callback;
    //player.runCommandAsync(`say hi`)
    // Subscribe tick event to the time function
    system.run(async () => {
      onJoinSpawn(player);
    });
  });
};

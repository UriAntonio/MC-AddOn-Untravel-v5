import { world } from "@minecraft/server";


function serverBan() {
    for (let player of world.getPlayers()) {
        if (!player.hasTag("isBanned")) {
            return;
        }
    }
    if (que) {
        
    }
}
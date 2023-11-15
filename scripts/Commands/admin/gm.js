import { Log } from "../../Modules/Log/Log";
import Server from "../../server";

const prefix = Server.getPrefix()
const gm = {
    gmC: "creative",
    gmS: "survival",
    gmA: "adventure",
    gmP: "spectator"
};

Server.Commands.register({
    name: "gm",
    description: "Cambia el modo de juego",
    usage: "gm",
    aliases: ["gamemode"],
    admin: true,
    category: "Admin",

}, (data, player, args) => {

    if ((args == "help")) {
        return //gmcHelp(player, prefix);
    }
    if (args == "s") {
        player.gamemode = gm.gmS
        Log(`§b${player.name} ahora esta en ${gm.gmS} `)
        return
    }
    if (player.gamemode == gm.gmP) {
        player.gamemode = gm.gmC
        Log(`§b${player.name} ahora esta en ${gm.gmC} `)
        return
    }
    else {
        player.gamemode = gm.gmP
        Log(`§b${player.name} ahora esta en ${gm.gmP} `)
        return
    }

    

    
})
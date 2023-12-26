import { Log } from "../../Modules/Log/Log";
import Untravel from "../../Untravel";

const gm = {
    gmC: "creative",
    gmS: "survival",
    gmA: "adventure",
    gmP: "spectator"
};

Untravel.cmd.add({
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
        try {
            player.removeEffect("night_vision")
        } catch (error) {}
        try {
            player.removeEffect("invisibility")
        } catch (error) {}
        Log(`${player.name} ahora esta en §7${gm.gmS} `)
        return
    }
    if (player.gamemode == gm.gmP) {
        player.gamemode = gm.gmC
        try {
            player.addEffect("night_vision", 10000, { showParticles: false, amplifier: 255 })
        } catch (error) {}
        try {
            player.removeEffect("invisibility")
        } catch (error) {}
        Log(`${player.name} ahora esta en §7${gm.gmC} `)
        return
    }
    else {
        player.gamemode = gm.gmP
        try {
            player.addEffect("night_vision", 10000, { showParticles: false, amplifier: 255 })
        } catch (error) {}
        try {
            player.addEffect("invisibility", 10000, { showParticles: false, amplifier: 255 })
        } catch (error) {}
        Log(`${player.name} ahora esta en §7${gm.gmP} `)
        return
    }




})
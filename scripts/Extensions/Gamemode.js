// Author: bone/r trippleawap < Discord>
// https://github.com/TrippleAWap
import { Player } from '@minecraft/server';
import Server from '../server';
import Config from '../conf/Configuration';
import { LogWarn } from '../Modules/Log/Log';

/**
 * @name gamemode
 * @returns {get}  retorna el modo de juego em string
 * @param {set} string asigana el modo de juego
 */
Object.defineProperty(Player.prototype, "gamemode", {
    get() {
        return ["survival", "creative", "adventure", "spectator"].find(i => this.matches({ gameMode: i }))
    },
    set(value) {
        this.runCommandAsync(`gamemode ${value}`)
    }
})

Server.System.runInterval( () => {
    Server.world.getAllPlayers().forEach(player => {
let gms = "survival"
//gamemode s @a[m=1,tag=!Adminer]
if ((player.gamemode == "creative") && !player.hasTag(Config.gmc)) {
    player.gamemode = gms
    LogWarn(`${player.name} estaba en creativo!!!`)
}
let statusNotify = Database.get("Notify", player)
if (statusNotify && !player.hasTag("Notify")) {
    player.addTag("Notify")
}
if ((statusNotify == false) && player.hasTag("Notify")) {
    player.removeTag("Notify")
}
    })
}, 20)

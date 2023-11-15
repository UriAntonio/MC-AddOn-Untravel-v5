// Author: bone/r trippleawap < Discord>
// https://github.com/TrippleAWap
import { Player } from '@minecraft/server';

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
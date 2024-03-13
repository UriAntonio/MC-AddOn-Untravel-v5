import { GameMode, Player } from "@minecraft/server";
import Untravel from "../../Untravel";
import { guia } from "../welcome/w-page-1";

const JoinDB = Untravel.Join

/**
 * 
 * @param {Player} player 
 * @param {GameMode} gamemode 
 */
export const firstJoin = (player, gamemode) => {
    let build = {}
    build.first = true
    build.date = Date.now()
    JoinDB.set(`${player.name}`, `${build}`)

    guia(player, gamemode)
}
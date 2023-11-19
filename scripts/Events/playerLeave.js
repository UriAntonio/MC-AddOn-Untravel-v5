import { Player } from "@minecraft/server"
import { Log } from "../Modules/Log/Log"
import Server from "../server"

/**
 * @param {Player} data
 */
Server.Minecraft.world.afterEvents.playerLeave.subscribe((data) => {
  let playerN = data.playerName
  Server.PlayerOnline[playerN] = undefined
})

/**
 * @param {Player} data
 */
Server.world.beforeEvents.playerLeave.subscribe(async (data) => {
  let player = data.player
  let gm = player.gamemode
  Log(`§e${player.name}§a se desconecto del servidor ${Date()} en §2${Math.floor(player.location.x)}, ${Math.floor(player.location.y)}, ${Math.floor(player.location.z)} | gm: ${gm}`)
})
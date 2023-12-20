import { Player } from "@minecraft/server"
import { Log } from "../Modules/Log/Log"
import Untravel from "../Untravel"

const TimeDB = Untravel.TimeDB
const LastDB = Untravel.LastDB
/**
 * @param {Player} data
 */
Untravel.Minecraft.world.afterEvents.playerLeave.subscribe((data) => {
  let playerN = data.playerName
   const TimeSaved = TimeDB.get(playerN)
  const DateNow = Date.now()
  const DateLogin = Untravel.PlayerOnline[playerN] 
  const TimePlayed = Math.ceil((DateNow - DateLogin))
  TimeDB.set(playerN, TimeSaved + TimePlayed)
  Untravel.PlayerOnline[playerN] = undefined
  LastDB.set(playerN, DateNow)
})

/**
 * @param {Player} player
 */
Untravel.world.beforeEvents.playerLeave.subscribe(async (data) => {
  let player = data.player
  let gm = player.gamemode
  Log(`§e${player.name}§a se desconecto del servidor ${Date()} en §2${Math.floor(player.location.x)}, ${Math.floor(player.location.y)}, ${Math.floor(player.location.z)} | gm: ${gm}`)
})
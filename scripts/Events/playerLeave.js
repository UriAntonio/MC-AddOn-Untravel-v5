import { Log } from "../Modules/Log/Log"
import Server from "../server"

Server.Minecraft.world.afterEvents.playerLeave.subscribe((data) => {
  let player = data.playerName
  Log(`§e${data.playerName}§r se desconecto del servidor ${Date()}`)
  Server.PlayerOnline[player] = undefined
})
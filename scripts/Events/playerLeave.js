import Server from "../server"

Server.Minecraft.world.afterEvents.playerLeave.subscribe((data) => {
  let player = data.playerName
  Server.PlayerOnline[player] = undefined
})
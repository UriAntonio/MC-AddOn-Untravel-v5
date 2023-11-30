import Server from "../../main"

const WarpDB = Server.WarpDB

Server.Commands.register({
  name: "listwarp",
  description: "Provides list of available warp",
  usage: "listwarp",
  category: "Warp"
}, async (data, player, args) => {
  let message = ""
  WarpDB.forEach((key, value) => {
    let placeName = key
    message += `\n§e  -§a ${placeName}`;
  })
  if (message != "") {
    player.sendMessage("§eWarps list :" + message)
  }
  else {
    player.sendMessage("§cNo warps have been set.")
  }
})
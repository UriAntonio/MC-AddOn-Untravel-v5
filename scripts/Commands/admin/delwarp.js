import Server from "../../main"

const WarpDB = Server.WarpDB

Server.Commands.register({
  name: "delwarp",
  description: "Removes a warp",
  usage: "delwarp <place_name>",
  permission: "warp",
  category: "Admin"
}, async (data, player, args) => {
  if (!args[0]) return player.sendMessage("§cInput a warp name.")
  let name = args.slice(0).join(" ")
  let warp = WarpDB.get(name)
  if (warp == undefined) return player.sendMessage("§cInvalid warp.")
  await WarpDB.delete(name)
  player.sendMessage(`§aSuccessfully remove warp place with name ${name}!`)
})
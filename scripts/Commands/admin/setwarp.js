import Server from "../../main"

const WarpDB = Server.WarpDB

Server.Commands.register({
  name: "setwarp",
  description: "Create a new warp",
  usage: "setwarp <place_name>",
  permission: "warp",
  category: "Admin"
}, async (data, player, args) => {
  if (!args[0]) return player.sendMessage("§cInput a warp name.")
  let name = args.slice(0).join(" ")
  let warp = WarpDB.get(name)
  if (warp != undefined) return player.sendMessage("§cDuplicate warp name, no warp was created.")
  const placeObject = {
    x: player.location.x,
    y: player.location.y,
    z: player.location.z,
    dimension: player.dimension.id
  }
  await WarpDB.set(name, placeObject)
  player.sendMessage(`§aSuccessfully add warp place with name ${name}!`)
})
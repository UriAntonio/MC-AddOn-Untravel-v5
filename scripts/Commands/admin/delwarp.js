import Server from "../../server"

const WarpDB = Server.WarpDB

Server.Commands.register({
  name: "delwarp",
  description: "Remueve un Warp",
  usage: "delwarp <nombre_del_lugar>",
  permission: "warp",
  category: "Admin"
}, async (data, player, args) => {
  if (!args[0]) return player.sendMessage("§a■§cIngresa el mombre del Warp.")
  let name = args.slice(0).join(" ")
  let warp = WarpDB.get(name)
  if (warp == undefined) return player.sendMessage("§a■§cWarp no valido.")
  await WarpDB.delete(name)
  player.sendMessage(`§1------------------------------\n§a■§3Eliminado exitosamente el Warp con el nombre §f${name}§3!`)
})
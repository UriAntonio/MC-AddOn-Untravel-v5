import { Log } from "../../Modules/Log/Log"
import Untravel from "../../Untravel"



Untravel.cmd.add({
  name: "delwarp",
  description: "Remueve un Warp",
  usage: "delwarp <nombre_del_lugar>",
  aliases: ["dw"],
  admin: true,
  category: "Admin"
}, async (data, player, args) => {
  const WarpDB = Untravel.WarpDB
  if (!args[0]) return player.sendMessage("§a■§cIngresa el mombre del Warp.")
  let name = args.slice(0).join(" ")
  let warp = WarpDB.get(name)
  if (warp == undefined) return player.sendMessage("§a■§cWarp no valido.")
  await WarpDB.delete(name)
  player.sendMessage(`§1------------------------------\n§a■§3Eliminado exitosamente el Warp con el nombre §f${name}§3!`)
  Log(`[ WARP ]${player.name} eliminó §b${name}`)
})
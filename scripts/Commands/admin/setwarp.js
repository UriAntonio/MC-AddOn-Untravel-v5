import Server from "../../server"

const WarpDB = Server.WarpDB

Server.Commands.register({
  name: "setwarp",
  description: "Crea un nuevo Warp",
  usage: "setwarp <nombre_del_lugar>",
  aliases: ["sw"],
  admin: true,
  category: "Admin"
}, async (data, player, args) => {
  if (!args[0]) return player.sendMessage("§a■§cIngresa un mombre para el Warp.")
  let name = args.slice(0).join(" ")
  let warp = WarpDB.get(name)
  if (warp != undefined) return player.sendMessage("§a■§cNombre de Warp duplicado, Warp no fue creado.")
  const placeObject = {
    x: player.location.x,
    y: player.location.y,
    z: player.location.z,
    dimension: player.dimension.id
  }
  await WarpDB.set(name, placeObject)
  player.sendMessage(`§1------------------------------\n§a■§3Warp creada exitosamente con el nombre §f${name}§3!`)
  Log(`[ WARP ]${player.name} agregó §b${name}§`)
})
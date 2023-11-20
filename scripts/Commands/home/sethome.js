import Config from "../../conf/Configuration"
import Server from "../../server"

const HomeDB = Server.HomeDB

Server.Commands.register({
  name: "sethome",
  description: "Agrega o Asigna hogar con el nombre seleccionado",
  usage: "sethome <home_name>",
  category: "Home"
}, async (data, player, args) => {
  if (!args[0]) return player.sendMessage("§a■§4Ingresa un mombre para tu hogar.")
  let homeCount = HomeDB.keys().filter(t => t.startsWith(player.name)).length
  if (!player.hasTag(Config.AdminTag) && homeCount >= (Server.Setting.get("homeLimit") ?? Config.homeLimit))
   return player.sendMessage("§a■§4Ya tienes el Maximo de hogares!")
  let name = args.slice(0).join(" ")
  let playerHome = HomeDB.keys().find(key => key == `${player.name}-${name}`)
  if (playerHome != undefined) return player.sendMessage("§a■§cNombre de hogar duplicado, hogar no fue creado.")
  const homeObject = {
    x: player.location.x,
    y: player.location.y,
    z: player.location.z,
    dimension: player.dimension.id
  }
  await HomeDB.set(`${player.name}-${name}`, homeObject)
  player.sendMessage(`§1------------------------------\n§a■§3Home creada exitosamente con el nombre §b${name}!`)
})
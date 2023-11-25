import Money from "../../Modules/Finance/Money"
import Config from "../../conf/Configuration"
import Server from "../../server"

const HomeDB = Server.HomeDB

Server.Commands.register({
  name: "sethome",
  aliases: ["sh"],
  description: `Agrega un hogar con el nombre seleccionado, Costo inicial(se duplica por cada hogar): §f${Config.homeCost} `,
  usage: "sethome <home_name>",
  category: "Home"
}, async (data, player, args) => {
  let homeArr = []
  let cost = Config.homeCost
  HomeDB.forEach((key) => {
    if (key.startsWith(player.name)) {
      let hname = key.substring(`${player.name}-`.length)
      homeArr.push(`${hname}`);
    }
  })
  for (let i = 0; i < homeArr.length; i++) {
    cost = cost + cost;

  }

  let balance = Money.getMoney(player.name)
  if (!args[0]) return player.sendMessage("§a■§cIngresa un mombre para tu hogar.")
  let homeCount = HomeDB.keys().filter(t => t.startsWith(player.name)).length
  if (!player.hasTag(Config.AdminTag) && homeCount >= (Server.Setting.get("homeLimit") ?? Config.homeLimit))
    return player.sendMessage("§a■§cYa tienes el Maximo de hogares!")
  let name = args.slice(0).join(" ")
  let playerHome = HomeDB.keys().find(key => key == `${player.name}-${name}`)
  if (playerHome != undefined) return player.sendMessage("§a■§cNombre de hogar duplicado, hogar no fue creado.")
  if (!player.isAdmin()) {
    if (balance < cost) return player.sendMessage(`§a■§cNo cuentas con fondos suficiente. Costo: §f${cost}`)
    if (player.dimension.id == "minecraft:nether") return player.sendMessage(`§a■§cLa dimension no esta habilitada para hogares`)
    if (player.dimension.id == "minecraft:end") return player.sendMessage(`§a■§cLa dimension no esta habilitada para hogares`)
    const homeObject = {
      x: player.location.x,
      y: player.location.y,
      z: player.location.z,
      dimension: player.dimension.id
    }
    Money.setMoney(player, balance - cost)
    await HomeDB.set(`${player.name}-${name}`, homeObject)
    player.sendMessage(`§1------------------------------\n§a■§3Home creada exitosamente con el nombre §f${name}§3!`)
    return
  }
  const homeObject = {
    x: player.location.x,
    y: player.location.y,
    z: player.location.z,
    dimension: player.dimension.id
  }
  //Money.setMoney(player, balance - cost)
  await HomeDB.set(`${player.name}-${name}`, homeObject)
  player.sendMessage(`§1------------------------------\n§a■§3Home creada exitosamente con el nombre §f${name}§3!`)
})
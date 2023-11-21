import Server from "../../server"


const HomeDB = Server.HomeDB

Server.Commands.register({
  name: "delhome",
  aliases: ["dhome", "dh"],
  description: "Borra o Remueve un hogar",
  usage: "delhome <home_name>",
  category: "Home"
}, async (data, player, args) => {
  if (!args[0]) return player.sendMessage("§a■§cIngresa un nombre de hogar.")
  let name = args.slice(0).join(" ")
  let playerHome = HomeDB.keys().find(h => h == `${player.name}-${name}`)
  if (playerHome != undefined) {
    await HomeDB.delete(playerHome)
    player.sendMessage(`§a■§3Eliminado exitosamente el hogar con el nombre §f${name}§3!`)
  } else {
    player.sendMessage("§a■§cHogar no valido.")
  }
})
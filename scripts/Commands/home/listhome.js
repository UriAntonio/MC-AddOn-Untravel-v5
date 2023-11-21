import Server from "../../server"

const HomeDB = Server.HomeDB

Server.Commands.register({
  name: "listhome",
  description: "Muestra una lista de todos tus hogares",
  usage: "listhome",
  aliases: ["homelist","homes"],
  category: "Home"
}, async (data, player, args) => {
  let message = ""
  HomeDB.forEach((key, value) => {
    if (key.startsWith(player.name)) {
      let home = value
      let hname = key.substring(`${player.name}-`.length)
      message += `\n§1  |§f ${hname}§b ${Math.round(home.x)}, ${Math.round(home.y)}, ${Math.round(home.z)} §1| §9${home.dimension}`;
    }
  })
  if (message != "") {
    player.sendMessage(`§1------------------------------\n§a■§3Homes List : ${message}`)
  }
  else {
    player.sendMessage("§a■§cHo hay Hogares.")
  }
})
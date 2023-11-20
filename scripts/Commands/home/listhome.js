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
      message += `\n§e  -§a ${hname}§e ${Math.round(home.x)}, ${Math.round(home.y)}, ${Math.round(home.z)} | ${home.dimension}`;
    }
  })
  if (message != "") {
    player.sendMessage(`§1------------------------------\n§a■§3Homes List : ${message}`)
  }
  else {
    player.sendMessage("§a■§cHo hay Hogares.")
  }
})
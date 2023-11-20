import Server from "../../server"

Server.Commands.register({
  name: "playerlist",
  aliases: ["playerson", "players"],
  description: "Para ver la lista de jugadores",
  usage: "playerlist",
  category: "General"
}, async (data, player, args) => {
  let message = "§a■§2[§aLISTA DE JUGADORES§2] : "
    Server.Minecraft.world.getAllPlayers().forEach(plr => {
      const DateNow = new Date()
      const DateLogin = Server.PlayerOnline[plr.name]
      const SecondPlayed = Math.ceil((DateNow - DateLogin) / 1000);
      message += `\n§2 - §6${plr.name} §2| §gEn Linea por`
      if (SecondPlayed >= 86400) {
        let day = Math.floor(SecondPlayed / 86400)
        message += ` §e${day} §gdias,`
      }
      if (SecondPlayed >= 3600) {
        let hour = Math.floor(SecondPlayed / 3600)
        message += ` §e${hour % 24} §ghoras,`
      }
      if (SecondPlayed >= 60) {
        let minute = Math.floor(SecondPlayed / 60)
        message += ` §e${minute % 60} §gminutos,`
      }
      let second = SecondPlayed
      message += ` §e${second % 60} §gsegundos`
    })
    player.sendMessage(message)
})
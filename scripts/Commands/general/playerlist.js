import Untravel from "../../Untravel"

Untravel.Commands.register({
  name: "playerlist",
  aliases: ["playerson", "players", "pl"],
  description: "Para ver la lista de jugadores y tiempo conectados",
  usage: "playerlist",
  category: "General"
}, async (data, player, args) => {
  let message = "§1------------------------------\n§a■§1[§9LISTA DE JUGADORES§1]"
    Untravel.Minecraft.world.getAllPlayers().forEach(plr => {
      const DateNow = new Date()
      const DateLogin = Untravel.PlayerOnline[plr.name]
      const SecondPlayed = Math.ceil((DateNow - DateLogin) / 1000);
      message += `\n§1 | §3${plr.name} §1| §bEn Linea por`
      if (SecondPlayed >= 86400) {
        let day = Math.floor(SecondPlayed / 86400)
        message += ` §f${day} §bdias,`
      }
      if (SecondPlayed >= 3600) {
        let hour = Math.floor(SecondPlayed / 3600)
        message += ` §f${hour % 24} §bhoras,`
      }
      if (SecondPlayed >= 60) {
        let minute = Math.floor(SecondPlayed / 60)
        message += ` §f${minute % 60} §bminutos,`
      }
      let second = SecondPlayed
      message += ` §f${second % 60} §bsegundos`
    })
    player.sendMessage(message)
})
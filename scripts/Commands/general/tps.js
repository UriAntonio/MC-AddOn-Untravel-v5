import Server from "../../server"

Server.Commands.register({
  name: "tps",
  description: "Check Server Tick per Second",
  usage: "tps",
  category: "General"
}, async (data, player, args) => {
  let TPS = Math.floor(Server.TPS())
  if (TPS > 20) TPS = 20
  player.sendMessage("§a■§6Ticks Por Segundo: §g" +  TPS)
})
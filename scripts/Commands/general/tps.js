import Untravel from "../../Untravel"

Untravel.cmd.add({
  name: "tps",
  description: "Checa los Tick por Segundo del Servidor",
  usage: "tps",
  category: "General"
}, async (data, player, args) => {
  let TPS = Math.floor(Untravel.TPS())
  if (TPS > 20) TPS = 20
  player.sendMsgToPlayer("§3Ticks Por Segundo: §b" +  TPS)
})
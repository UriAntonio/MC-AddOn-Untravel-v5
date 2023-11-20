import Utility from "../../Modules/Utilities/Utility"
import Server from "../../server"


Server.Commands.register({
  name: "topmoney",
  aliases: ["topbal", "topcartera", "topbalance"],
  description: "See Money Leaderboard",
  usage: "topmoney",
  category: "Money"
}, async (data, player, args) => {
  let BalanceData = Server.Money.getAllMoney()
  if (BalanceData.length <= 0) return player.sendMessage("§6No hay jugadores con fondos.")
  BalanceData.sort((a, b) => b.playerMoney - a.playerMoney)
  let show = 10
  if (BalanceData.length < 10) show = BalanceData.length
  let message = "§2[§aTOP TABLA DE CLASIFICACIÓN DE DINERO§2]"
  for (let i = 0; i < show; i++) {
    let playerName = BalanceData[i].playerName
    let playerMoney = Number(BalanceData[i].playerMoney)
    message += `\n§6${i + 1}. §g${playerName}: §e${Utility.formatMoney(playerMoney)}`
  }
  player.sendMessage(message)
})
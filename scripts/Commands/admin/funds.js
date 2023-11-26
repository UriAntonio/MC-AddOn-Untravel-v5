import Utility from "../../Modules/Utilities/Utility"
import Server from "../../server"


Server.Commands.register({
  name: "funds",
  aliases: ["f", "fund"],
  description: "Mira los Fondos Generales de Server",
  usage: "funds",
  admin: true,
  category: "Admin"
}, async (data, player, args) => {
  let BalanceData = Server.Fund.getAllMoney()
  if (BalanceData.length == 0) return player.sendMessage("§1------------------------------\n§a■§3No hay Fondos registrados.")
  BalanceData.sort((a, b) => b.playerMoney - a.playerMoney)
  let show = 10
  if (BalanceData.length < 10) show = BalanceData.length
  let message = "§1------------------------------\n§a■§1[§9Fondos Generales Del Servidor§1]"
  for (let i = 0; i < show; i++) {
    let playerName = BalanceData[i].playerName
    let playerMoney = Number(BalanceData[i].playerMoney)
    message += `\n§9${i + 1}. §3${playerName}: §b${Utility.formatMoney(playerMoney)}`
  }
  player.sendMessage(message)
})
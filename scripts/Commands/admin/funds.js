import Utility from "../../Modules/Utilities/Utility"
import Untravel from "../../Untravel"


Untravel.cmd.add({
  name: "funds",
  aliases: ["f", "fund"],
  description: "Mira los Fondos Generales de Untravel",
  usage: "funds",
  admin: true,
  category: "Admin"
}, async (data, player, args) => {
  let BalanceData = Untravel.Fund.getAllMoney()
  if (BalanceData.length == 0) return player.sendMessage("§1------------------------------\n§a■§3No hay Fondos registrados.")
  BalanceData.sort((a, b) => b.playerMoney - a.playerMoney)
  let show = 10
  if (BalanceData.length < 10) show = BalanceData.length
  let message = "§1------------------------------\n§a■§1[§9Fondos Generales Del Servidor§1]"
  for (let i = 0; i < show; i++) {
    let playerName = BalanceData[i].fund
    let playerMoney = Number(BalanceData[i].fundsMoney)
    message += `\n§9${i + 1}. §3${playerName}: §b${Utility.formatMoney(playerMoney)}`
  }
  player.sendMessage(message)
})
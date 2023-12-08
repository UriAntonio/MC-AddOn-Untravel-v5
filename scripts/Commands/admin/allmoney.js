import Utility from "../../Modules/Utilities/Utility"
import Untravel from "../../Untravel"


Untravel.Commands.register({
  name: "allmoney",
  aliases: ["am"],
  description: "Mira todos lo que tienen Dinero",
  usage: "allmoney",
  admin: true,
  category: "Admin"
}, async (data, player, args) => {
  let BalanceData = Untravel.Money.getAllMoney()
  if (BalanceData.length <= 0) return player.sendMessage("§1------------------------------\n§a■§3No hay jugadores con fondos.")
  BalanceData.sort((a, b) => b.playerMoney - a.playerMoney)
  let show =  BalanceData.length
  if (BalanceData.length < 10) show = BalanceData.length
  let message = "§1------------------------------\n§a■§1[§9TABLA DE DINERO§1]"
  for (let i = 0; i < show; i++) {
    let playerName = BalanceData[i].playerName
    let playerMoney = Number(BalanceData[i].playerMoney)
    message += `\n§9${i + 1}. §3${playerName}: §b${Utility.formatMoney(playerMoney)}`
  }
  player.sendMessage(message)
})
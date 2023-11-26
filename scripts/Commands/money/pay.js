import Utility from "../../Modules/Utilities/Utility";
import Server from "../../server";


Server.Commands.register({
    name: "pay",
    description: "Paga a algien , Tranferencia",
    aliases: ["pagar"],
    usage: "pay <player_nombre> <cantidad>",
    category: "Money"
  }, async (data, player, args) => {
    if (!args[0]) return player.sendMessage("§a■§cIngresa un mombre de Jugador.")
    let extractData = await Utility.ExtractNameFromString(args.join(" "), 0)
    if (!extractData) return player.sendMessage("§a■§cIngresa un mombre de Jugador.")
    args = extractData.string.split(" ")
    if (!args[0]) return player.sendMessage("§a■§cIngresa una cantidad.")
    let targetPlayer = await Server.getPlayer(extractData.name)
    if (targetPlayer == player) return player.sendMessage("§a■§cNo puedes pagarte a ti mismo.")
    if (targetPlayer != undefined) {
      const maxMoney = Server.Money.getMaxMoney()
      let amount = Number(args[0])
      if (!Number.isInteger(amount)) return player.sendMessage("§a■§cIngresa la cantidad en un Numero.")
      if (amount <= 0) return player.sendMessage("§a■§cIngresa una cantidad superior a 1!.")
      let playerMoney = player.getMoney()
      let targetMoney = targetPlayer.getMoney()
      if (amount > playerMoney) return player.sendMessage("§a■§cFondos Insuficientes.")
      if (targetMoney >= maxMoney) return player.sendMessage(`§a■§c${targetPlayer.name} tiene su dinero al maximo!`)
      if ((targetMoney + amount) > maxMoney) amount = maxMoney - targetMoney
      playerMoney = playerMoney - amount
      targetMoney = targetMoney + amount
      await player.setMoney(playerMoney)
      await targetPlayer.setMoney(targetMoney)
      player.sendMessage(`§1------------------------------\n§a■§3Se pago a §b${targetPlayer.name}§3 la cantidad de §f${Utility.formatMoney(amount)} §3exitosamente.`)
      targetPlayer.sendMessage(`§a${player.name} has paid you §e${Utility.formatMoney(amount)}.`)
      Server.Log(`[Money] ${player.name} pagó a ${targetPlayer.name} la cantidad de§f ${Utility.formatMoney(amount)}`)
    } else {
      return player.sendMessage("§a■§cNo hay Objetivos que coincidan con el selector")
    }
  })
import { Log } from "../../Modules/Log/Log"
import Utility from "../../Modules/Utilities/Utility"
import Untravel from "../../Untravel"

Untravel.Commands.register({
    name: "setmoney",
    aliases: ["sm"],
    description: "Establese el dinero de un jugador",
    usage: "setmoney <player_name> <cantidad>",
    admin: true,
    category: "Admin"
  }, async (data, player, args) => {
    if (!args[0]) return player.sendMessage("§a■§cIngresa un mombre de Jugador.")
    let extractData = await Utility.ExtractNameFromString(args.join(" "), 0)
    if (!extractData) return player.sendMessage("§a■§cIngresa un mombre de Jugador.")
    args = extractData.string.split(" ")
    if (!args[0]) return player.sendMessage("§a■§cIngresa una cantidad.")
    let targetPlayer = await Untravel.getPlayer(extractData.name)
    if (targetPlayer != undefined) {
      let amount = Number(args[0])
      if (!Number.isInteger(amount)) return player.sendMessage("§a■§cIngresa la cantidad en un Numero.")
      await targetPlayer.setMoney(amount)
      player.sendMessage(`§1------------------------------\n§a■§3Se puso a §b${targetPlayer.name}§3 la cantidad de §f${Utility.formatMoney(amount)} §3exitosamente.`)
      Log(`[ MONEY ]${player.name} puso a §b${targetPlayer.name}§3 la cantidad de §f${amount}`)
    } else {
      return player.sendMessage("§a■§cNo hay Objetivos que coincidan con el selector")
    }
  })
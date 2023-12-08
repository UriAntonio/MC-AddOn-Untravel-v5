import Untravel from "../../Untravel"
import Utility from "../../Modules/Utilities/Utility"

const BanDB = Untravel.BanDB

Untravel.Commands.register({
  name: "unban",
  description: "Desbanea al Jugador especificado",
  usage: "unban <player_name>",
  admin: true,
  category: "Admin"
}, async (data, player, args) => {
  if (!args[0]) return player.sendMessage("§a■§cIngresa un mombre de Jugador.")
  let extractData = await Utility.ExtractNameFromString(args.join(" "), 0)
  if (!extractData) return player.sendMessage("§a■§cIngresa un mombre de Jugador.")
  let targetPlayer = BanDB.get(extractData.name)
  if (targetPlayer != undefined) {
    await BanDB.delete(extractData.name)
    player.sendMessage(`§1------------------------------\n§a■§3Se Desbaneo a §r${extractData.name} §3exitosamente.`)
  } else {
    player.sendMessage("§a■§cNo hay Objetivos que coincidan con el selector")
  }
})
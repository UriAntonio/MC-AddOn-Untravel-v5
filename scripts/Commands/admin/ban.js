import Untravel from "../../Untravel"
import Utility from "../../Modules/Utilities/Utility"
import { LogWarn } from "../../Modules/Log/Log"



Untravel.cmd.add({
  name: "ban",
  description: "Banea a un Jugador",
  usage: "ban <player_name> <reason?>",
  admin: true,
  category: "Admin"
}, async (data, player, args) => {
  const BanDB = Untravel.BanDB
  if (!args[0]) return player.sendMessage("§a■§cIngresa un mombre de Jugador.")
  let extractData = await Utility.ExtractNameFromString(args.join(" "), 0)
  if (!extractData) return player.sendMessage("§a■§cIngresa un mombre de Jugador.")
  args = extractData.string.split(" ")
  let targetPlayer = await Untravel.getPlayer(extractData.name)
  if (targetPlayer == player) return player.sendMessage("§a■§cNo puedes Banearte a ti mismo.")
  let reason = args.join(" ") || "Sin razon"
  if (targetPlayer != undefined) {
    if (targetPlayer.isOp()) return LogWarn(`${player.name} intento Banear a ${targetPlayer}`), player.sendMessage("§a■§c§l ...");
    console.log(`${targetPlayer.name}`);
    await BanDB.set(targetPlayer.name, {
      reason: reason,
      by: player.name
    })
    console.log(`${targetPlayer.name} | ${reason} | ${player.name}`);

    let result = await targetPlayer.kick(`\n§l§cFUISTE BANNEADO!\n§bRazon:§r ${reason}\n§eBaneado Por:§r ${player.name}\n§6Si piensas que hubo un error\ncomunicate a §bsupport@untravelmx.com  §r`)
    if (result.successCount == 0) return player.sendMessage(`§1------------------------------\n§a■§cHubo un arror al intentar banear a  §r${targetPlayer.name}§c del juego.`)
    player.sendMessage(`§1------------------------------\n§a■§3Se Baneao a §r${targetPlayer.name} §3exitosamente.`)
  } else {
    player.sendMessage("§a■§cNo hay Objetivos que coincidan con el selector")
  }
})
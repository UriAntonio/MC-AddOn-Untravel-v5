import Server from "../../main"
import Utility from "../../Modules/Utility"

const BanDB = Server.BanDB

Server.cmd.add({
  name: "tempban",
  description: "Temporary ban a user",
  usage: "tempban <player_name> <time> <reason?>",
  permission: "ban",
  category: "Admin"
}, async (data, player, args) => {
  if (!args[0]) return player.sendMessage("§cInput a player name.")
  let extractData = await Utility.ExtractNameFromString(args.join(" "), 0)
  if (!extractData) return player.sendMessage("§cInput a player name.")
  args = extractData.string.split(" ")
  let targetPlayer = await Server.getPlayer(extractData.name)
  if (targetPlayer == player) return player.sendMessage("§cYou may not ban yourself.")
  if (!args[0]) return player.sendMessage("§cInput the duration. §eExample: 30d1h.") 
  let time = Utility.convertTextToMilliseconds(args[0])
  if (time <= 0) return player.sendMessage("§cInput the duration. §eExample: 30d1h.") 
  let duration = Date.now() + time
  let reason = args.slice(1).join(" ") || "No reason"
  if (targetPlayer != undefined) {
    await BanDB.set(targetPlayer.name, {
      reason: reason,
      by: player.name,
      duration: duration
    })
    let result = await targetPlayer.kick(`\n§c§lYou're have been banned\nReason : §e${reason} \n§cBy : §e${player.name} \n§cDuration : §e${Utility.formatTextFutureDate(duration)}`)
    if (result.successCount == 0) return player.sendMessage(`§cSomething error when banned ${targetPlayer.name} from the game.`)
    player.sendMessage(`§aSuccessfully banned ${targetPlayer.name}`)
  } else {
    player.sendMessage("§cNo targets matched selector")
  }
})
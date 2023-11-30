import Config from "../../Configuration"
import Server from "../../main"
import { getCooldown, setCooldown } from "../../Modules/Cooldown"

const WarpDB = Server.WarpDB

Server.Commands.register({
  name: "warp",
  description: "Teleport to selected warp",
  usage: "warp <place_name>",
  aliases: ["w"],
  category: "Warp"
}, async (data, player, args) => {
  if (!args[0]) return player.sendMessage("§cInput a warp name.")
  let name = args.slice(0).join(" ")
  let warp = WarpDB.get(name)
  if (warp != undefined) {
    if (player.isCombat()) return player.sendMessage("§cYou are in combat!")
    if (getCooldown("warp", player) > 0) return player.sendMessage(`§cYou just use warp command! In cooldown for §e${getCooldown("warp", player)}s.`)
    let warpCD = Server.Setting.get("warpCooldown") ?? Config.warpCooldown
    setCooldown("warp", player, warpCD)
    let warpCountdown = Server.Setting.get("warpCountdown") ?? Config.warpCountdown
    if (warpCountdown > 0 && !player.isAdmin()) {
      player.sendMessage(`§eDo not move for ${warpCountdown} second to teleport!`)
      let playerPosition = player.location
      let cancel = false
      let canceled = false
      let countdown = warpCountdown
      for (let i = 0; i < warpCountdown; i++) {
        if (player.isCombat() || player.location.x != playerPosition.x || player.location.y != playerPosition.y || player.location.z != playerPosition.z) cancel = true
        if (cancel) {
          if (!canceled) player.sendMessage("§cCanceled!")
          canceled = true
          return;
        }
        player.onScreenDisplay.setActionBar(`§eDo not move for §c${countdown}s`)
        countdown--
        await Server.sleep(1000)
        player.onScreenDisplay.setActionBar(`§eDo not move for §c${countdown}s`)
      }
    }
    player.sendMessage("§eTeleporting...")
    await Server.teleportPlayer(player, warp, { dimension: Server.getDimension(warp.dimension) })
    player.sendMessage("§aSuccessfully Teleported.")
  } else {
    player.sendMessage("§cInvalid warp.")
  }
})
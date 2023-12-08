import Config from "../../conf/Configuration"
import Untravel from "../../Untravel"
import { getCooldown, setCooldown } from "../../Modules/Cooldown"
const BackDB = Untravel.BackDB

Untravel.Commands.register({
  name: "back",
  description: "Teleport to last died location",
  usage: "back",
  category: "General"
}, async (data, player, args) => {
  const backData = BackDB.get(player.name)
  if (backData != undefined) {
    if (player.isCombat()) return player.sendMessage("§cYou are in combat!")
    if (getCooldown("back", player) > 0) return player.sendMessage(`You just use back command! In cooldown for §e${getCooldown("back", player)}s.`)
    let backCD = Untravel.Setting.get("backCooldown") ?? Config.backCooldown
    setCooldown("back", player, backCD)
    let backCountdown = Untravel.Setting.get("backCountdown") ?? Config.backCountdown
    if (backCountdown > 0 && !player.isAdmin()) {
      player.sendMessage(`§eDo not move for ${backCountdown} second to teleport!`)
      let playerPosition = player.location
      let cancel = false
      let canceled = false
      let countdown = backCountdown
      for (let i = 0; i < backCountdown; i++) {
        if (player.isCombat() || player.location.x != playerPosition.x || player.location.y != playerPosition.y || player.location.z != playerPosition.z) cancel = true
        if (cancel) {
          if (!canceled) player.sendMessage("§cCanceled!")
          canceled = true
          return;
        }
        player.onScreenDisplay.setActionBar(`§eDo not move for §c${countdown}s`)
        countdown--
        await Untravel.sleep(1000)
        player.onScreenDisplay.setActionBar(`§eDo not move for §c${countdown}s`)
      }
    }
    player.sendMessage("§eTeleporting...")
    await Untravel.teleportPlayer(player, backData, { dimension: Untravel.getDimension(backData.dimension) })
    player.sendMessage("§aSuccessfully Teleported.")
  } else {
    player.sendMessage("§cYou do not have died location!")
  }
})
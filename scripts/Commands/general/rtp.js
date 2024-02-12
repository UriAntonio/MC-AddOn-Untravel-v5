import { system, world } from "@minecraft/server"
import Utility from "../../Modules/Utilities/Utility"
import Untravel from "../../Untravel"
import { getCooldown, setCooldown } from "../../Modules/Tempo/Cooldown"
import Config from "../../conf/Configuration"

const TPRange = 1000
const playerTeleport = {}

Untravel.cmd.add({
  name: "jump",
  description: `Salto subespacial en un rango de ${TPRange} bloques`,
  usage: "jump",
  category: "General"
}, async (data, player, args) => {
  if (player.isCombat()) return player.sendMessage(`${Config.serverStyler}§cEstas en Combate!`)
  if (getCooldown("rtp", player) > 0) return player.sendMessage(`§cYou just use rtp command! In cooldown for §e${getCooldown("rtp", player)}s.`)
  let rtpCD = Untravel.Setting.get("rtpCooldown") ?? Config.rtpCooldown
  setCooldown("rtp", player, rtpCD)
  let rtpCountdown = Untravel.Setting.get("rtpCountdown") ?? Config.rtpCountdown
  if (rtpCountdown > 0 && !player.isAdmin()) {
    player.sendMessage(`§eDo not move for ${rtpCountdown} second to teleport!`)
    let playerPosition = player.location
    let cancel = false
    let canceled = false
    let countdown = rtpCountdown
    for (let i = 0; i < rtpCountdown; i++) {
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
  playerTeleport[player.name] = generateRandomLocation(player)
  player.sendMessage("§eTeleporting...")
  let interval = system.runInterval(() => {
    if (!playerTeleport[player.name]) return system.clearRun(interval)
    let location = playerTeleport[player.name]
    player.teleport({ x: location.x, y: 320, z: location.z })
    let block = player.dimension.getBlock({ x: location.x, y: 0, z: location.z })
    player.onScreenDisplay.setActionBar("§eLoading chunks...")
    if (!block) return
    for (let i = 320; i >= -64; i--) {
      let block = player.dimension.getBlock({ x: location.x, y: i, z: location.z })
      if (!block.isAir) {
        player.teleport({ x: location.x + 0.5, y: i + 2.5, z: location.z + 0.5 })
        delete playerTeleport[player.name]
        player.sendMessage("§aSuccessfully Teleported.")
        break;
      }
      if (i == -64) playerTeleport[player.name] = generateRandomLocation(player)
    }
  })
})

const generateRandomLocation = (player) => {
  const range = TPRange / 2
  const location = {
    x: Math.floor(player.location.x + Utility.random(-Math.abs(range), Math.abs(range))),
    z: Math.floor(player.location.z + Utility.random(-Math.abs(range), Math.abs(range)))
  }

  return location
}
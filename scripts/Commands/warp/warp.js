import Config from "../../conf/Configuration"
import Untravel from "../../Untravel"
import { getCooldown, setCooldown } from "../../Modules/Tempo/Cooldown"
import Action from "../../Modules/Log/ActionLog"
import Fund from "../../Modules/Finance/Funds"
import Money from "../../Modules/Finance/Money"

const WarpDB = Untravel.WarpDB

Untravel.cmd.add({
  name: "warp",
  description: "Teleport al warp seleccionado",
  usage: "warp <nombre_de_lugar>",
  aliases: ["w"],
  category: "Warp"
}, async (data, player, args) => {
  let cost = Config.warpCost
  let balanceFund = Fund.getMoney()
  let balance = Money.getMoney(player.name)
  if (!args[0]) return player.sendMessage("§a■§cIngresa el mombre del Warp.")
  let name = args.slice(0).join(" ")
  let warp = WarpDB.get(name)
  if (warp != undefined) {
    if (name.toLowerCase() == "coliseo") cost = Config.warpColiseo
    if (player.isCombat()) return player.sendMessage("§a■§cEstas en Combate!")
    if (balance < cost) return player.sendMessage(`§a■§cNo cuentas con fondos suficiente. Costo: §f${cost}`)
    if (getCooldown("warp", player) > 0) return player.sendMessage(`§a■§cYa has usado el comando home! En enfriamiento por: §f${getCooldown("warp", player)}s.`)
    let warpCD = Untravel.Setting.get("warpCooldown") ?? Config.warpCooldown
    setCooldown("warp", player, warpCD)
    let warpCountdown = Untravel.Setting.get("warpCountdown") ?? Config.warpCountdown
    if (warpCountdown > 0 && !player.isAdmin()) {
      player.sendMessage(`§a■§bNo te muevas por: §f${warpCountdown}§b segundos para Teletransportarte!`)
      let playerPosition = player.location
      let cancel = false
      let canceled = false
      let countdown = warpCountdown
      for (let i = 0; i < warpCountdown; i++) {
        if (player.isCombat() || player.location.x != playerPosition.x || player.location.y != playerPosition.y || player.location.z != playerPosition.z) cancel = true
        if (cancel) {
          if (!canceled) player.sendMessage("§1------------------------------\n§a■§cCancelado!")
          canceled = true
          return;
        }
        Action.setAction(player, 2, `§a■§bNo te muevas por: §f${countdown}s`)
        countdown--
        await Untravel.sleep(1000)
        Action.setAction(player, 2, `§a■§bNo te muevas por: §f${countdown}s`)
      }
      Money.setMoney(player.name, balance - cost)
      Fund.setMoney(balanceFund + cost)
    }
    player.sendMessage("§a■§3Teletransportando...")
    await Untravel.teleportPlayer(player, warp, { dimension: Untravel.getDimension(warp.dimension) })
    player.sendMessage("§1------------------------------\n§a■§3Teletransportado Correctamente.")
  } else {
    player.sendMessage("§a■§cWarp Invalido.")
  }
})
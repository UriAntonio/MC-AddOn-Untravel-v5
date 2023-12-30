import Config from "../../conf/Configuration"
import Untravel from "../../Untravel"
import { getCooldown, setCooldown } from "../../Modules/Tempo/Cooldown"
import Action from "../../Modules/Log/ActionLog"
import Fund from "../../Modules/Finance/Funds"
import Money from "../../Modules/Finance/Money"
import { ActionFormData } from "@minecraft/server-ui"
import untravel from "../../Extensions/untravel"
import { ForceOpen } from "../../Modules/Server/Forms"

const WarpDB = Untravel.WarpDB
const { symbols: { portal, coin } } = untravel
Untravel.cmd.add({
  name: "warp",
  description: "Teleport al warp seleccionado",
  usage: "warp",
  aliases: ["w"],
  category: "Warp"
}, async (data, player, args) => {
  let title = Config.serverTitle(`WARPS`)
  let message = ""
  let cost = Config.warpCost
  let balanceFund = Fund.getMoney()
  let balance = Money.getMoney(player.name)
  const warpsArr = WarpDB.lenght > 0 ? WarpDB.keys() : ["Sin Datos"]
  if (player.isCombat()) return player.sendMessage("§a■§cEstas en Combate!")
  const form = new ActionFormData().title(`${title}`).body(`${message}`)
  warpsArr.forEach(x => {
    let precio = x != "coliseo" ? Config.warpCost : Config.warpColiseo
    form.button(`${portal} §l§d${x} ${coin}: §6${precio}`)
  })
  player.sendMessage(`${Config.FormMessage}`)
  let res = await ForceOpen(player, form)
  if (!res.canceled) {
    let result = res.selection
    let selected = warpsArr[result]
    if (selected == "Sin Datos") return player.sendMessage(`${Config.serverStyler}§cNo hay Warps agregados`)
    if (selected == "coliseo") cost = Config.warpColiseo
    if (balance < cost && !player.isAdmin()) return player.sendMessage(`§a■§cNo cuentas con fondos suficiente. Costo: §f${cost}`)
    const warp = WarpDB.get(selected)
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
          if (!canceled) player.sendMessage(`${Config.serverStyler}§cCancelado!`)
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
    player.sendMessage(`${Config.serverStyler}§3Teletransportado Correctamente.`)
  
  }

  
  
  
  
})
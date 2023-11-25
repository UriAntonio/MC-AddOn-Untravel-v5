import Server from "../../server"
import Config from "../../conf/Configuration"
import { getCooldown, setCooldown } from "../../Modules/Tempo/Cooldown"

const HomeDB = Server.HomeDB

Server.Commands.register({
  name: "home",
  description: "teletransporte a el hogar seleccionado",
  usage: "home <home_name>",
  aliases: ["ho"],
  admin: true,
  category: "Admin"
}, async (data, player, args) => {
  if (!args[0]) return player.sendMessage("§a■§cIngresa un mombre para tu hogar.")
    let name = args.slice(0).join(" ")
    let playerHome = HomeDB.get(`${player.name}-${name}`)
    if (playerHome != undefined) {
      if (player.isCombat()) return player.sendMessage("§a■§cEstas en Combate!")
      if (getCooldown("home", player) > 0) return player.sendMessage(`§a■§cSolo has usado el comando home! En enfriamiento por: §f${getCooldown("home", player)}s`)
      let homeCD = Server.Setting.get("homeCooldown") ?? Config.homeCooldown
      setCooldown("home", player, homeCD)
      let homeCountdown = Server.Setting.get("homeCountdown") ?? Config.homeCountdown
      if (homeCountdown > 0) {
        player.sendMessage(`§a■§bNo te muevas por: §f${homeCountdown}§b segundos para Teletransportarte!`)
        let playerPosition = player.location
        let cancel = false
        let canceled = false
        let countdown = homeCountdown
        for (let i = 0; i < homeCountdown; i++) {
          if (player.isCombat() || player.location.x != playerPosition.x || player.location.y != playerPosition.y || player.location.z != playerPosition.z) cancel = true
          if (cancel) {
            if (!canceled) player.sendMessage("§a■§cCancelado!")
            canceled = true
            return;
          }
          player.onScreenDisplay.setActionBar(`§a■§bNo te muevas por: §f${countdown}s`)
          countdown--
          await Server.sleep(1000)
          player.onScreenDisplay.setActionBar(`§a■§bNo te muevas por: §f${countdown}s`)
        }
      }
      player.sendMessage("§a■§3Teletransportando...")
      await Server.teleportPlayer(player, playerHome, { dimension: Server.getDimension(playerHome.dimension) })
      player.sendMessage("§a■§bTeletransportado Correctamente.")
    } else {
      player.sendMessage("§a■§cHogar Invalido.")
    }
})
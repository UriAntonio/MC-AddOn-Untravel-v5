import Config from "../../conf/Configuration";
import Server from "../../server";

const BackCooldown = {}
const TPACooldown = {}
const HomeCooldown = {}
const WarpCooldown = {}
const CommandCooldown = {}

const CooldownType ={
    BACK: "back",
    TPA: "tpa",
    HOME: "home",
    WARP: "warp",
    COMMAND: "command"
}

/**
 * Get Player cooldown
 * @param {string} type 
 * @param {mc.Player} player 
 * @returns 
 */
const getCooldown = (type, player) => {
    if (player.hasTag(Config.AdminTag)) return 0
    switch (type) {
      case CooldownType.BACK:
        var cooldown = BackCooldown[player.name]
        if (!cooldown) return 0
        if (Date.now() >= cooldown) return 0
        return Math.ceil((cooldown - Date.now()) / 1000)
  
      case CooldownType.TPA:
        var cooldown = TPACooldown[player.name]
        if (!cooldown) return 0
        if (Date.now() >= cooldown) return 0
        return Math.ceil((cooldown - Date.now()) / 1000)
  
      case CooldownType.HOME:
        var cooldown = HomeCooldown[player.name]
        if (!cooldown) return 0
        if (Date.now() >= cooldown) return 0
        return Math.ceil((cooldown - Date.now()) / 1000)
  
      case CooldownType.WARP:
        var cooldown = WarpCooldown[player.name]
        if (!cooldown) return 0
        if (Date.now() >= cooldown) return 0
        return Math.ceil((cooldown - Date.now()) / 1000)
  
      case CooldownType.COMMAND:
        var cooldown = CommandCooldown[player.name]
        if (!cooldown) return 0
        if (Date.now() >= cooldown) return 0
        return Math.ceil((cooldown - Date.now()) / 1000)
  
      default:
        return 0
    }
  }
  
  /**
 * Set Player cooldown
 * @param {string} type 
 * @param {Server.Player} player 
 * @param {number} second 
 * @returns 
 */
const setCooldown = (type, player, second) => {
    if (player.hasTag(Config.AdminTag)) return 0
    let nextDate = new Date(Date.now() + (second * 1000))
    switch (type) {
      case CooldownType.BACK:
        BackCooldown[player.name] = nextDate
        break
  
      case CooldownType.TPA:
        TPACooldown[player.name] = nextDate
        break
  
      case CooldownType.HOME:
        HomeCooldown[player.name] = nextDate
        break
  
      case CooldownType.WARP:
        WarpCooldown[player.name] = nextDate
        break
  
      case CooldownType.COMMAND:
        CommandCooldown[player.name] = nextDate
        break
  
      default:
        break;
    }
  }

  export { setCooldown, getCooldown }
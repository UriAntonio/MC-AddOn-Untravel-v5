import * as mc from "@minecraft/server";
import * as ui from "@minecraft/server-ui"
import Config from "./Commands/Configuration";
import CommandBuilder from "./Modules/Utilities/CommandBuilder";
import { Log, LogWarn, SystemLog } from "./Modules/Log/Log";
import { Database } from "./Modules/DataBase/Database";
import getTPS from "./Modules/Utilities/TickPerSecond"
import Setting from "./Modules/Server/Setting";
import PlayerClass from "./Modules/PlayerClass";
//
import Money from "./Modules/Finance/Money";
import Fund from "./Modules/Finance/Funds";
//
import Dynamic from "./Extensions/Database";
import { DB } from "./Modules/DataBase/UntravelDB";
import NewSetting from "./Modules/Land/Setting";
import Faction from "./Modules/Faction/Faction";
import Utility from "./Modules/Utilities/Utility";


const Event = [
  "chatSend",
  "playerSpawn",
  "itemUse",
  "playerLeave",
  "playerDie",
  "entityDie",
  "combat",
  "playerInteract",
  "systemRun",
  "block",
]

const Extensions = {
  "Bow-ding": false,
  "Gamemode": false,
  "Database": false,
  "untravel": false,
  "HealthDisplay": true,
  "playerHealth": false
}




class UntravelClass {
  constructor() {
    this.cmd = CommandBuilder
    this.Minecraft = mc
    this.System = mc.system
    this.PlayerOnline = {}
    this.HomeDB = new DB("homeDB")
    this.WarpDB = new DB("warpDB")
    this.BackDB = new DB("backDB")
    this.BanDB = new DB("banDB")
    this.TimeDB = new DB("time")
    this.LastDB = new DB("lastJoinDB")
    this.PlayerStats = new DB("statsDB")
    this.ClaimBlocks = new DB("claimDB")
    this.Owners = new DB("ServerOwners")
    this.Admins = new DB(`ServerAdmins`)
    this.Fund = Fund
    this.Setting = NewSetting
    this.Money = Money
    this.Faction = Faction
    this.TPS = getTPS
    this.world = mc.world
    this.Log = Log
    this.overworld = mc.world.getDimension("overworld")
    this.isLoaded = false
    this.timeStarted = Date.now()
    //this.Commands = new CommandBuilder("mce")
    //this.usingLandClaim = false
  }

  /**
     * Obtiene al Jugadorpor Nombre
     * @param {string} targetName 
     * @returns {PlayerClass}
     */
  getPlayer(targetName) {
    return this.world.getAllPlayers().find(player => player.name == targetName)
  }

  /**
     * Obtiene la Dimension por string
     * @param {string} dimensionId 
     * @returns {mc.Dimension}
     */
  getDimension(dimensionId) {
    return this.world.getDimension(dimensionId)
  }

  /**
     * Obtiene el Inventory de la Entity
     * @param {mc.Entity} entity 
     * @returns {mc.Container}
     */
  getInventory(entity) {
    return entity.getComponent("minecraft:inventory").container
  }

  /**
   * Ejecuta comando como world
   * @param {string} command 
   * @param {string} dimension 
   * @returns {mc.CommandResult}
   */
  async runCommand(command, dimension) {
    let res = await this.getDimension(dimension ?? "minecraft:overworld").runCommandAsync(command)
    return res
  }

  /**
   * Get Command Prefix
   * @returns {string}
   */
  getPrefix() {
    return this.Setting.get("commandPrefix") ?? Config.Prefix
  }

  /**
   * Delay Function
   * @param {number} ms 
   */
  async sleep(ms) {
    return new Promise((resolve) => {
      mc.system.runTimeout(resolve, (ms / 1000) * 20)
    })
  }

  /**
   * Teleport Player
   * @param {mc.Player} player 
   * @param {mc.Vector} vector 
   * @param {mc.TeleportOptions} options
   */
  async teleportPlayer(player, vector, options) {
    await player.teleport(vector, options)
    Log(`[Teleport] ${player.name} teleported to ${Math.round(vector.x)} ${Math.round(vector.y)} ${Math.round(vector.z)}`)
  }

  /**
   * Send Untravel Message
   * @param {string} message
   */
  async sendMessage(message) {
    return await this.world.sendMessage(message)
  }

  async sendMsgAll(target, message) {
    try {
      Untravel.overworld.runCommandAsync(
        `tellraw ${/^ *@[spear]( *\[.*\] *)?$/.test(target)
          ? target
          : JSON.stringify(target)
        } {"rawtext":[{"text":${JSON.stringify(
          Array.isArray(message) ? message.join("\n\u00a7r") : message
        )}}]}`
      );
    } catch { }
  }

  /**
   * 
   * @param {mc.Player} target 
   * @param {string} message 
   */
  async sendMsgToPlayer(target, message) {
    let msg
    try {
      if (Array.isArray(message)) {
        msg = message.join("\n")
        msg.replace(`"`, " ")
      }

      let msg = message
      //console.log(msg)
      target.sendMessage(`${Config.serverStyler}`+"§r" + msg);
      // target.runCommandAsync(
      //   `tellraw @s {"rawtext":[{"text":${JSON.stringify(
      //     Array.isArray(message) ? message.join("\n\u00a76") : message
      //   )}}]}`
      // );
    } catch { }
  }

  /**
   * 
   * @param {mc.Player} target Jugador objetivo
   * @param {string} line0 mensaje hasta arriba
   * @param {string} line1 mensaje en medio up
   * @param {string} line2 mensaje en medio down
   * @param {string} line3 mensaje hasta abajo
   */
  actionBar(target, line0, line1, line2, line3) {
    let final1, final2, final3
    if (line0 == undefined) line0 = ""
    line1 == undefined? final1 = "" : final1 = "\n"+line1
    line2 == undefined? final2 = "" : final2 = "\n"+line2
    line3 == undefined? final3 = "" : final3 = "\n"+line3
    if (line2 == undefined) line2 = ""
    if (line3 == undefined) line3 = ""
    target.onScreenDisplay.setActionBar(`${line0+final1+final2+final3}`)
  }

  async tagTitle(player, titleTag, titleName) {
    let tags = player.getTags();
    let titleOne = "Un Dios Desconocido";
    for (const tag of tags) {
      if (tag.startsWith("Title:")) {
        titleOne = tag.replace("Title:", "");
        titleOne = titleOne.replaceAll("--", "§o§7><§r");
      }
    }
    titleName = `§7<§3${titleOne}§7>§r §7${player.name}§r`;
    titleTag = `§7<§3${titleOne}§7>§r`;
    return titleTag, titleName;
  }

  async banMessage(player) {
    let tags = player.getTags();
    let reason = "N/A";
    let by = "N/A";
    // this removes old ban stuff
    tags.forEach((t) => {
      if (t.startsWith("By:")) by = t.slice(3);
      if (t.startsWith("Reason:")) reason = t.slice(7);
    });
    try {
      player.runCommandAsync(
        `kick ${JSON.stringify(
          player.name
        )} §r\n§l§cFUISTE BANNEADO!\n§r\n§eBanned Por:§r ${by}\n§bRazon:§r ${reason}\n§6Si piensas que hubo un error comunicate con los administradores. `
      );
    } catch (error) {
      // if we cant kick them with /kick then we instant despawn them
      //    player.triggerEvent("paradox:kick");
    }
  }

  GetSetting = async (settingName) => {
    let value = NewSetting.get(settingName)
    NewSetting.SettingData.set(settingName, value)
    return value
  }

  
/**
 * 
 * @param {Player} player 
 * @returns 
 */
getClaimBlock = (player) => {
  return this.ClaimBlocks.get(player) ?? Config.starterClaimBlock
}

/**
 * 
 * @param {Player} player 
 * @param {number} amount 
 */
setClaimBlock = (player, amount) => {
  return this.ClaimBlocks.set(player, amount)
}

/**
 * Format Money
 * @param {number} amount
 * @param {boolean} withPrefix 
 * @returns {string}
 */
formatMoney = async (amount, withPrefix = true) => {
  let currencyPrefix = await this.GetSetting("xpPrefix") ?? Config.xpPrefix
  return `${withPrefix ? currencyPrefix : ""}${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

/**
 * 
 * @param {Player} player 
 * @param {ui.ActionFormData | ui.MessageFormData | ui.ModalFormData} form 
 * @returns {Promise<ui.ActionFormResponse | ui.MessageFormResponse | ui.ModalFormResponse>}
 */
ForceOpen = async (player, form, timeout = 1200) => {
  let startTick = this.System.currentTick
  while ((this.System.currentTick - startTick) < timeout) {
    const response = await form.show(player)
    if (response.cancelationReason !== "UserBusy")
      return response
  }
  return undefined
}

  async waitLoaded() {
    return new Promise((resolve) => {
      let systemId = mc.system.runInterval(() => {
        let ent = this.world.getAllPlayers()
        if (ent.length > 0) {
          this.isLoaded = true
          mc.system.clearRun(systemId)
          resolve()
        }
      }, 10)
    })
  }
}

const Untravel = new UntravelClass()

Untravel.world.afterEvents.worldInitialize.subscribe(async (data) => {
  const date = Date.now()
  //await Untravel.waitLoaded()
  Object.keys(Config.Commands).forEach(category => {
    Object.keys(Config.Commands[category]).forEach(cmd => {
      if (!Config.Commands[category][cmd]) return;
      import(`./Commands/${category}/${cmd}`).catch(err => LogWarn(`Fallo al importar el comando: ${cmd} | ${category} | ${err}`))
    })
  })

  Log(`§dEl Sistema Untravel fue cargado correctamente en tiempo: §e${Date.now() - date}ms`)
  Untravel.world.getAllPlayers()
    .filter(p => p.isAdmin())
    .forEach(p => {
      p.sendMessage(`§bAdmin El Sistema Untravel fue cargado correctamente en tiempo: §e${Date.now() - date}ms`)
    })

    Untravel.world.getAllPlayers().forEach((player) => {
      Untravel.PlayerOnline[player.name] = Date.now()
  })
  Log(`§2Se agrego fechas`)

  const AdminKey = Utility.UUID.generate()
  Log(`Id del Mundo: ${AdminKey}`)
  Dynamic.set("world", `${AdminKey}`)
  Dynamic.set("coliseoManager", true) //si esta en false el CM estara apagado y no se podra usar
  Dynamic.set("coliseoCooldown", "")
  
  Log(`Se agrregaron llaves`)

  //let land = await Restful.request("land-isActive")
  //Untravel.usingLandClaim = land?.active ?? false
})

// mc.world.afterEvents.playerSpawn.subscribe(data => {
//   if (data.initialSpawn) data.player.sendMessage(`Type "${Untravel.getPrefix()}help" for more information.`),
//   SystemLog(`§ctest1 Spawn Event`)
// })

mc.system.beforeEvents.watchdogTerminate.subscribe(data => {
  data.cancel = true
  SystemLog(`§cWatchdog Terminate: ${data.terminateReason}`)
})

export default Untravel
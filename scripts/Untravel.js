import * as mc from "@minecraft/server";
//
import Config from "./conf/Configuration";
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
]

const Extensions = {
  "Bow-ding": false,
  "Gamemode": false,
  "Database": false,
  //"HealthDisplay": true,
}




class UntravelClass {
  constructor() {
    this.Commands = CommandBuilder
    this.Minecraft = mc
    this.System = mc.system
    this.PlayerOnline = {}
    this.HomeDB = new Database("homeDB")
    this.WarpDB = new Database("warpDB")
    this.BackDB = new Database("backDB")
    this.BanDB = new DB("banDB")
    this.TimeDB = new DB("time")
    this.Fund = Fund
    this.Setting = new Setting()
    this.Money = Money
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

  async sendMsgToPlayer(target, message) {
    try {
      target.runCommandAsync(
        `tellraw @s {"rawtext":[{"text":${JSON.stringify(
          Array.isArray(message) ? message.join("\n\u00a76") : message
        )}}]}`
      );
    } catch { }
  }

  /**
   * 
   * @param {mc.Player} target Jugador objetivo
   * @param {string} line1 mensaje hasta arriba
   * @param {string} line2 mensaje en medio
   * @param {string} line3 mensaje hasta abajo
   */
  actionBar(target, line1, line2, line3) {
    if (line1 == undefined) line1 = ""
    if (line2 == undefined) line2 = ""
    if (line3 == undefined) line3 = ""
    target.onScreenDisplay.setActionBar(`${line1+"\n"+line2+"\n"+line3}`)
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
  Event.forEach(event => {
    import(`./Events/${event}`).catch(err => LogWarn(`§cFallo al importar el evento: ${event} | ${err}`))
  })
  Object.keys(Extensions).forEach(ExtName => {
    import(`./Extensions/${ExtName}.js`).then(Ext => {
      Extensions[ExtName] = true
      Log(`La extencion §b${ExtName}§r fue Cargada`)
    }).catch(err => LogWarn(`§cFallo al importar la extencion: ${ExtName} | ${err}`))
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

  Dynamic.set(Config.AdminTag, Config.AdminKey)
  Dynamic.set("word", Config.ConfigPassword)
  Dynamic.set("coliseoManager", true) //si esta en false el CM estara apagado y no se podra usar
  Dynamic.set("coliseoCooldown", "")
  Log(`Se agrregaron llaves`)

  //let land = await Restful.request("land-isActive")
  //Untravel.usingLandClaim = land?.active ?? false
})

//mc.world.afterEvents.playerSpawn.subscribe(data => {
//  if (data.initialSpawn) data.player.sendMessage(`Type "${Untravel.getPrefix()}help" for more information.`)
//})

mc.system.beforeEvents.watchdogTerminate.subscribe(data => {
  data.cancel = true
  SystemLog(`§cWatchdog Terminate: ${data.terminateReason}`)
})

export default Untravel
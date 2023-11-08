import * as mc from "@minecraft/server";
import Config from "./conf/Configuration";
//
import { Log, SystemLog } from "./Modules/Log";
import { Database } from "./Modules/DataBase/Database";
//
import Setting from "./Modules/Setting";
//
//
//
//

const Event = [
  "chatSend",
  "playerSpawn",
  "itemUse",
  "playerLeave",
  "playerDie"
]






class ServerClass {
  constructor() {
    //this.Commands = CommandBuilder
    this.Minecraft = mc
    this.System = mc.system
    this.PlayerOnline = {}
    //this.HomeDB = new Database("homeDB")
    //this.WarpDB = new Database("warpDB")
    this.BackDB = new Database("backDB")
    //this.BanDB = new Database("banDB")
    this.Setting = new Setting()
    //this.Money = Money
    //this.TPS = getTPS
    this.world = mc.world
    this.Log = Log
    this.overworld = mc.world.getDimension("overworld")
    //this.isLoaded = false
    //this.timeStarted = Date.now()
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
   * Send Server Message
   * @param {string} message
   */
  async sendMessage(message) {
    return await this.world.sendMessage(message)
  }

  async sendMsgAll(target, message) {
    try {
      Server.overworld.runCommandAsync(
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
          Array.isArray(message) ? message.join("\n\u00a7r") : message
        )}}]}`
      );
    } catch { }
  }

  async getScore(playerSelect, score) {
    return Server.world.scoreboard
      .getObjective(score)
      .getScore(playerSelect.scoreboard);
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

const Server = new ServerClass()

Server.world.afterEvents.worldInitialize.subscribe(async (data) => {
  const date =  Date.now()
  //await Server.waitLoaded()
  //Object
  //
  //
  //
  //
  //
  Event.forEach(event => {
    import(`./Events/${event}`).catch(err => Log(`§cFallo al importar el evento: ${event} | ${err}`))
  })

  //Object
  //
  //
  //
  //
  //

  Log(`§dEl Sistema Untravel fue cargado correctamente en tiempo: §e${Date.now() - date}ms`)
  Server.world.getAllPlayers()
    .filter(p => p.hasTag(Config.AdminTag))
    .forEach(p => {
      p.sendMessage(`§dEl Sistema Untravel fue cargado correctamente en tiempo: §e${Date.now() - date}ms`)
    })

  Server.world.getAllPlayers().forEach((player) => {
    Server.PlayerOnline[player.name] = Date.now()
  })
})

mc.system.beforeEvents.watchdogTerminate.subscribe(data => {
  data.cancel = true
  SystemLog(`§cWatchdog Terminate: ${data.terminateReason}`)
})

export default Server
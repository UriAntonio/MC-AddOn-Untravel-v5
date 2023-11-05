import * as mc from "@minecraft/server";
import Config from "./conf/Configuration";
//
import { Log, SystemLog } from "./modules/Log";
import { Database } from "./modules/DataBase/Database";


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
    //this.Setting = new Setting()
    //this.Money = Money
    //this.TPS = getTPS
    this.world = mc.world
    this.Log = Log

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
  //const date = new Date.now()
  //await Server.waitLoaded()
  //
  Event.forEach(event => {
    import(`./Events/${event}`)
  })
})

mc.system.beforeEvents.watchdogTerminate.subscribe(data => {
  data.cancel = true
  SystemLog(`Watchdog Terminate: ${data.terminateReason}`)
})

export default Server
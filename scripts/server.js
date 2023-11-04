import  * as mc  from "@minecraft/server";
import Config from "./conf/Configuration";


const Event = [
  "chatSend",
  "playerSpawn",
  "itemuse",
  "playerleave"
]


class ServerClass {
  constructor() {
    //this.Commands = CommandBuilder
    this.Minecraft = mc
    this.System = mc.system
    this.PlayerOnline = {}
    //this.HomeDB = new Database("homeDB")
    //this.WarpDB = new Database("warpDB")
    //this.BackDB = new Database("backDB")
    //this.BanDB = new Database("banDB")
    //this.Setting = new Setting()
    //this.Money = Money
    //this.TPS = getTPS
    this.world = mc.world
    //this.Log = Log

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
}


const Server = new ServerClass()


mc.system.beforeEvents.watchdogTerminate.subscribe(data => {
    data.cancel = true
    SystemLog(`Watchdog Terminate: ${data.terminateReason}`)
  })

export default Server
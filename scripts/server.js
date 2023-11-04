import  * as mc  from "@minecraft/server";
import Config from "./conf/Configuration";


const Event = [
  "chatSend",
  "playerSpawn",
  "itemuse"
]


class ServerClass {
  constructor() {
    //this.Commands = CommandBuilder
    this.Minecraft = mc
    this.System = mc.system
    //this.PlayerOnline = {}
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
}

const Server = new ServerClass()


mc.system.beforeEvents.watchdogTerminate.subscribe(data => {
    data.cancel = true
    SystemLog(`Watchdog Terminate: ${data.terminateReason}`)
  })

export default Server
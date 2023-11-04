import  * as mc  from "@minecraft/server";
import Config from "./conf/Configuration";







mc.system.beforeEvents.watchdogTerminate.subscribe(data => {
    data.cancel = true
    SystemLog(`Watchdog Terminate: ${data.terminateReason}`)
  })
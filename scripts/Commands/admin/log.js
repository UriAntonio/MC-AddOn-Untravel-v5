import { Log, LogData } from "../../Modules/Log/Log";
import Untravel from "../../Untravel";
import { MessageFormData } from "@minecraft/server-ui";
import { ForceOpen } from "../../Modules/Server/Forms";


Untravel.cmd.add({
    name: "log",
    description: "Checa todos los Logs",
    usage: "log",
    aliases: ["logs"],
    admin: true,
    category: "Admin"
}, async (data, player, args) => {
    let logData = [...LogData].reverse()
    logData.splice(0, 1)
    const logForm = new MessageFormData()
        .title("§9§lLogs")
        .body(logData.join("\n§r"))
        .button2('§l§bLimpiar')
        .button1('§l§1Cerrar')

    player.sendMessage("§1------------------------------\n§a■§3Cierra el Chat para ver el Panel")
    let res = await ForceOpen(player, logForm)
    if(!res.canceled) {
        if (res.selection == 1) {
            //ClearLog()
            //Log(`[Logs] ${player.name} Logs limpiados`)
            //return player.sendMessage("§1------------------------------\n§a■§3Se limpiaron los Logs correctamente")
          }
    }
})
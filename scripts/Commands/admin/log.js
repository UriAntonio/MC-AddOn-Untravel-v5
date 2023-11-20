import { Log, LogData } from "../../Modules/Log/Log";
import Server from "../../server";
import { MessageFormData } from "@minecraft/server-ui";
import { ForceOpen } from "../../Modules/Server/Forms";


Server.Commands.register({
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
        .title("Logs")
        .body(logData.join("\n§r"))
        .button2('§l§cLimpiar')
        .button1('§l§8Cerrar')

    Server.sendMsgToPlayer(player, "§a■§6Cierra el Chat para ver el Panel")
    let res = await ForceOpen(player, logForm)
    if(!res.canceled) {
        if (res.selection == 1) {
            //ClearLog()
            Log(`[Logs] ${player.name} Logs limpiados`)
            return Server.sendMsgToPlayer(player, "§a■§6Se limpiaron los Logs correctamente")
          }
    }
})
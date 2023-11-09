import { LogData } from "../../Modules/Log/Log";
import Server from "../../server";
import { MessageFormData } from "@minecraft/server-ui";
import { ForceOpen } from "../../Modules/Server/Forms";


Server.Commands.register({
    name: "log",
    description: "Check Logs",
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
        .button2('§l§8Clear')
        .button1('§l§cClose')

    Server.sendMsgToPlayer(player, "§6Cierra el Chat para ver el Panel")
    let res = await ForceOpen(player, logForm)
    if(!res.canceled) {
        if (res.selection == 1) {
            //ClearLog()
            Log(`[Logs] ${player.name} cleared logs`)
            return Server.sendMsgToPlayer(player, "§aSuccessfully clear logs")
          }
    }
})
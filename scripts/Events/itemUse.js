import Untravel from "../Untravel";
import { ForceOpen } from "../Modules/Server/Forms";
import { MessageFormData } from "@minecraft/server-ui";
import { LogDataMsg } from "../Modules/Log/msgLog";
import { Player } from "@minecraft/server";
import Action from "../Modules/Log/ActionLog"

/**
 * 
 * @param {Player} player 
 * @returns 
 */
function MsgLogs(player) {
    let logDataMsg = [...LogDataMsg].reverse()
    Untravel.System.run(() => {
        const logForm = new MessageFormData()
            .title("§9§l Msg Logs")
            .body(logDataMsg.join("\n§r"))
            .button2('§l§bLimpiar')
            .button1('§l§1Cerrar')

        player.sendMessage("§1------------------------------\n§a■§3Cierra el Chat para ver el Panel")
        let res = ForceOpen(player, logForm)
        if (!res.canceled) {
            if (res.selection == 1) {
                //ClearLog()
                //Log(`[Logs] ${player.name}  Msg Logs limpiados`)
                return player.sendMessage("§1------------------------------\n§a■§3Se limpiaron los Logs correctamente")
            }
        }
    })

}

Untravel.world.beforeEvents.itemUse.subscribe((data) => {
    const source = data.source
    const items = data.itemStack
    if (items.typeId == "mx:new" &&
        source.isAdmin()) {
            if (source.isSneaking) return Action.setAction(source, 2, "sniking")
        MsgLogs(source)
    }
})

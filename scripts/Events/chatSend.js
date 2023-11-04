import  Config  from "../conf/Configuration";
import { ctl } from "../command/ctl";
import { util } from "../util/utils";
import Server from "../server";

const commandDefinitions = Object.setPrototypeOf({
    ctl: ctl,
    /**gmc: gmc,
    ban: ban,
    unban: unban,
    say: say,
    help: help,
    setting: setting,
    clan: clan,
    team: team,*/

}, null)

export const chatFilter = () => {
    Server.world.beforeEvents.chatSend.subscribe((eventData) => {
        let player = eventData.sender;
        let msg = eventData.message
        let tags = player.getTags()
        let rank
        if (msg.startsWith(Config.Prefix)) {
            eventData.cancel = true;
            let arg = msg.slice(Config.Prefix.length).split(/ +/)
            const commandName = arg.shift().toLowerCase()
            //Registro de LogScreen
            if (Config.debug) {
                //console.warn(`${new Date()} | did run command handler`)
                
            }
            //Advierte que el comando no es parte del CommandDefinition Handler
            if (!(commandName in commandDefinitions)) {
                util.sendMsgToPlayer(player, `§cComando desconocido: ${commandName}. Revisa que el comando exista y que tengas permiso para usarlo.`)
                return eventData.cancel = true
            }
            //Ejecuta los comandos que coincidan en el CommandDefinition handler
            commandDefinitions[commandName](eventData, arg, msg.slice(Config.Prefix.length + commandName.length + 1), commandName)
            console.warn(`${new Date()} | "${player.name}" used the command: ${Config.Prefix}${commandName}  ${arg} and ${arg.join(" ")}`)

        }
        //Evita que los jugadores muteados hablen en el chat
        if (player.hasTag("isMuted")) {
            util.sendMsgToPlayer(player,`${Config.serverName}§c Has sido silenciad@.`)
            eventData.cancel = true
            return;  
        }
        for (const tag of tags) {
            if (tag.startsWith("Rank:")) {
                rank = tag.replace("Rank:", "")
                rank = rank.replaceAll("--", "§r§o§7][§r")
            }
        }
        if (!rank) {
            rank = "★";
        }
        //envia el mensaje al chat general
        if (!eventData.cancel) {
            util.sendMsg(
               "@a", `§r§o§7${player.name}§7 [§8${rank}§r§o§7] >> §r${msg}`
            )
            eventData.cancel = true;
        }
    })
}
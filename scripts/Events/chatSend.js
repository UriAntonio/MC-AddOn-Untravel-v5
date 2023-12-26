import Config from "../conf/Configuration";
import Untravel from "../Untravel";
import { getCooldown, setCooldown } from "../Modules/Tempo/Cooldown";
import { Log } from "../Modules/Log/Log";
import { msgLog } from "../Modules/Log/msgLog";

/**
 * @param {PlayerClass} player
 */

Untravel.world.beforeEvents.chatSend.subscribe((eventData) => {
    let player = eventData.sender;
    let msg = eventData.message
    let tags = player.getTags()
    let rank
    let prefix = Untravel.getPrefix()
    //Evita que los jugadores muteados hablen en el chat
    if (player.isMuted()) {
        player.sendMessage(`${Config.serverName}§c Has sido silenciad@ en el chat global.`)
        eventData.cancel = true
        return;
    }

    if (msg.startsWith(prefix)) {
        eventData.cancel = true;
        let args = msg.slice(prefix.length).trim().split(/ +/)
        const commandCall = args.shift().toLowerCase()
        let cmd = Untravel.cmd.getRegistration(commandCall)
        if (getCooldown("command", player) > 0) return player.sendMessage(`§a■§cPorfavor espera, el comando esta en cooldown por §e${getCooldown("command", player)}s!`)
        if (!cmd) {
           player.sendMessage(`§cComando desconocido: ${commandCall}. Revisa que el comando exista y que tengas permiso para usarlo.`)
            return eventData.cancel = true
        }
        /**
         * recuerda registrar el comando en {Settings}
         * esto verifica que el comando no seaa de la categoria System o si esta desabilitado
         */
        if ((Untravel.Setting.get(`${cmd.category.toLowerCase()}System`) ?? true) == false) {
            player.sendMessage(`§cComando desconocido: ${commandCall}. Revisa que el comando exista y que tengas permiso para usarlo.`)
            return eventData.cancel = true
        }
        //Se ejecuta si el comando no esta registrado en Settings y en Configuracion aparece como falso o undefined 
        if ((Untravel.Setting.get(`${cmd.settingname}System`) ?? Config.Commands[cmd.category.toLowerCase()][cmd.settingname]) == false) {
            player.sendMessage(`§cComando desconocido: ${commandCall}. Revisa que el comando exista y que tengas permiso para usarlo.`)
            return eventData.cancel = true
        }
        //valida que el comando no sea de clase Admin
        if (cmd.admin && !player.isAdmin()) {
            player.sendMessage(`§cComando desconocido: ${commandCall}. Revisa que el comando exista y que tengas permiso para usarlo.`)
            return eventData.cancel = true
        }
        //Ejecuta el comando
        Untravel.System.run(() => {
            try {
                cmd.callback(eventData, player, args)
            } catch (err) { console.warn(err) }
        })
        //ejecuta el cooldown para los comandos
        setCooldown("command", player, Untravel.Setting.get("commandCooldown") ?? Config.commandCooldown)
        if (cmd.category == "Op") return Log(`[OP][Command] ${player.name} uso el comando §7${cmd.name}`)
        Log(`[Command] ${player.name} uso el comando §7${cmd.name} | argumentos: ${args}.`)
    }
    //Se asigna rango
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
        Untravel.sendMsgAll(
            "@a", `§r§o§7${player.name}§7 [§8${rank}§r§o§7] >> §r${msg}`
        )
        msgLog(`§r§o§g${player.name}§7 [§8${rank}§r§o§7] >> §r${msg}`)
        eventData.cancel = true;
    }
})

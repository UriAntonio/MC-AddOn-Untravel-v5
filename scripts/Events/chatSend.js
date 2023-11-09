import Config from "../conf/Configuration";
import { ctl } from "../command/admin/ctl";
import Server from "../server";
import { getCooldown, setCooldown } from "../Modules/Tempo/Cooldown";

const prefix = Server.getPrefix()
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

Server.world.beforeEvents.chatSend.subscribe((eventData) => {
    let player = eventData.sender;
    let msg = eventData.message
    let tags = player.getTags()
    let rank
    //Evita que los jugadores muteados hablen en el chat
    if (player.isMuted()) {
        Server.sendMsgToPlayer(player, `${Config.serverName}§c Has sido silenciad@ en el chat global.`)
        eventData.cancel = true
        return;
    }

    if (msg.startsWith(prefix)) {
        eventData.cancel = true;
        let args = msg.slice(prefix.length).trim().split(/ +/)
        const commandCall = args.shift().toLowerCase()
        let cmd = Server.Commands.getRegistration(commandCall)
        if (getCooldown("command", player) > 0) return Server.sendMsgToPlayer(player, `Porfavor espera, el comando esta en cooldown por §e${getCooldown("command", player)}s!`)
        if (!cmd) {
            Server.sendMsgToPlayer(player, `§cComando desconocido: ${commandCall}. Revisa que el comando exista y que tengas permiso para usarlo.`)
            return eventData.cancel = true
        }

        //Advierte que el comando no es parte del CommandDefinition Handler
        //if (!(commandCall in commandDefinitions)) {
        //    Server.sendMsgToPlayer(player, `§cComando desconocido: ${commandCall}. Revisa que el comando exista y que tengas permiso para usarlo.`)
        //    return eventData.cancel = true
        //}

        /**
         * recuerda registrar el comando en {Settings}
         * esto verifica que el comando no seaa de la categoria System o si esta desabilitado
         */
        if ((Server.Setting.get(`${cmd.category.toLowerCase()}System`) ?? true) == false) {
            Server.sendMsgToPlayer(player, `§cComando desconocido: ${commandCall}. Revisa que el comando exista y que tengas permiso para usarlo.`)
            return eventData.cancel = true
        }
        //Se ejecuta si el comando no esta registrado en Settings y en Configuracion aparece como falso o undefined 
        if ((Server.Setting.get(`${cmd.settingname}System`) ?? Config.Commands[cmd.category.toLowerCase()][cmd.settingname]) == false) {
            Server.sendMsgToPlayer(player, `§cComando desconocido: ${commandCall}. Revisa que el comando exista y que tengas permiso para usarlo.`)
            return eventData.cancel = true
        }
        //valida que el comando no sea de clase Admin
        if (cmd.admin && !player.hasTag(Config.AdminTag)) {
            Server.sendMsgToPlayer(player, `§cComando desconocido: ${commandCall}. Revisa que el comando exista y que tengas permiso para usarlo.`)
            return eventData.cancel = true
        }
        //Ejecuta el comando
        Server.System.run(() => {
            try {
                cmd.callback(eventData, player, args)
            } catch (err) { console.warn(err) }
        })
        //ejecuta el cooldown para los comandos
        setCooldown("command", player, Server.Setting.get("commandCooldown") ?? Config.commandCooldown)
        Log(`[Command] ${player.name} used ${cmd.name} command.`)
        //Ejecuta los comandos que coincidan en el CommandDefinition handler
        //commandDefinitions[commandCall](eventData, args, msg.slice(prefix.length + commandCall.length + 1), commandCall)
        //console.warn(`${new Date()} | "${player.name}" used the command: ${prefix}${commandCall}  ${args} and ${args.join(" ")}`)

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
        Server.sendMsgAll(
            "@a", `§r§o§7${player.name}§7 [§8${rank}§r§o§7] >> §r${msg}`
        )
        eventData.cancel = true;
    }
})

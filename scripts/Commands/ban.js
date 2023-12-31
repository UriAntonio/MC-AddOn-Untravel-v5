import  Config  from "../conf/Configuration";
import Server from "../server";



function banHelp(player) {
    return  Server.sendMsgToPlayer(player, [
        `\n§b~§aCommand§b~§r: ban`,
        `§b~§a§oUsage§b~§r: ban [optional]`,
        `§b~§a§oOptional§b~§r: NameTag, razon, help`,
        `§b~§a§oDescription§b~§r: Banea al usuario especificado y puedes dar una razon opcional.`,
        `§b~§a§oExamples§b~§r:`,
        `    ${Config.Prefix}ban ${player.name}`,
        `    ${Config.Prefix}ban ${player.name} Hacker!`,
        `    ${Config.Prefix}ban ${player.name} Atrapado usando Exploits!`,
        `    ${Config.Prefix}ban help`,
    ])
}


/**
 * @name ban
 * @param {beforeChatEvent} msg - Mensaje objeto.
 * @param {array} arg - Argumentos adicionales proveidos (opcional).
 */
export function ban(msg, arg, arg2, commandName) {
    //Validar que los parametros requeridos esten definidos
    if (!msg) {
        return console.warm(`${new Date()} | ` + `Error ${msg} isnt defined. Did you forget to pass it? ./command/moderation/ban.js`);
    }
    msg.cancel = true;
    let player = msg.sender
    let reason = arg.slice(1).join(" ") || "Sin razon especifica";
    //Asegurate que el usuario tiene permisos para usar el comando.
    if (!player) {
        
    }
}
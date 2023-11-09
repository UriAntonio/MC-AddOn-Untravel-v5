import Config from "../../conf/Configuration";
import Server from "../../server";



export function ctl(msg) {
    msg.cancel = true;
    let player = msg.sender;
    if (!player.hasTag(Config.AdminTag)) {
        return Server.sendMsgToPlayer(player, `§cComando desconocido: ctl. Revisa que el comando exista y que tengas permiso para usarlo.`);    }
    else {
        Server.sendMsgToPlayer(player, `§6Tp to control!`);
        Server.sendMsg("@a[tag=Adminer]", `§c[!]§r ${player.nameTag}§a was tp to Control.`);
        player.runCommandAsync(`tp @s 50018 202 50006`)
        return;
    }
}
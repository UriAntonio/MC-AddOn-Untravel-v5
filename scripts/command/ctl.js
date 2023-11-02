import { cfg } from "../conf/config";

export function ctl(msg) {
    msg.cancel = true;
    let player = msg.sender;
    if (!player.hasTag('staffstatus') || !player.hasTag('Adminer')) {
        return cfg.sendMsgToPlayer(player, `§cComando desconocido: ctl. Revisa que el comando exista y que tengas permiso para usarlo.`);    }
    else if (player.hasTag('staffstatus') && player.hasTag('Adminer')) {
        cfg.sendMsgToPlayer(player, `>>>§a Tp to control!`);
        cfg.sendMsg("@a[tag=Adminer]", `§c[!]§r ${player.nameTag}§a was tp to Control.`);
        player.runCommandAsync(`tp @s 50018 202 50006`)
        return;
    }
}
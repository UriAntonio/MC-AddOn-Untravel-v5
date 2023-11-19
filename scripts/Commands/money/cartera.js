import Server from "../../server";
import Utility from "../../Modules/Utilities/Utility"

Server.Commands.register({
    name: "cartera",
    description: "Checa tu dinero o el de alguien más",
    usage: "cartera <nombre de jugador?>",
    aliases: ["cash", "balance", "money", "bal"],
    category: "Money"
}, async (data, player, args) => {
    if (!args[0]) {
        let playerMoney = player.getMoney()
        Server.sendMsgToPlayer(player, `§6Tu Balance es: §e${Utility.formatMoney(playerMoney)}`)
    } else {
        let extractData = await Utility.ExtractNameFromString(args.join(" "), 0)
        let targetPlayer = await Server.getPlayer(extractData?.name ?? "")
        if (targetPlayer != undefined) {
            let targetMoney = targetPlayer.getMoney()
            Server.sendMsgToPlayer(player, `§6El Balance de §e${targetPlayer.name}§6 es: §e${Utility.formatMoney(targetMoney)}`)
        } else {
            let playerMoney = player.getMoney()
            Server.sendMsgToPlayer(player, `§6Tu Balance es: §e${Utility.formatMoney(playerMoney)}`)
        }
    }
})
import Untravel from "../../Untravel";
import Utility from "../../Modules/Utilities/Utility"

Untravel.cmd.add({
    name: "cartera",
    description: "Checa tu dinero o el de alguien más",
    usage: "cartera <nombre de jugador?>",
    aliases: ["cash", "balance", "money", "bal"],
    category: "Money"
}, async (data, player, args) => {
    if (!args[0]) {
        let playerMoney = player.getMoney()
        player.sendMessage(`§1------------------------------\n§a■§3Tu Balance es: §b${Utility.formatMoney(playerMoney)}`)
    } else {
        let extractData = await Utility.ExtractNameFromString(args.join(" "), 0)
        let targetPlayer = await Untravel.getPlayer(extractData?.name ?? "")
        if (targetPlayer != undefined) {
            let targetMoney = targetPlayer.getMoney()
            player.sendMessage(`§1------------------------------\n§a■§3El Balance de §b${targetPlayer.name}§3 es: §b${Utility.formatMoney(targetMoney)}`)
        } else {
            let playerMoney = player.getMoney()
            player.sendMessage(`§1------------------------------\n§a■§3Tu Balance es: §b${Utility.formatMoney(playerMoney)}`)
        }
    }
})
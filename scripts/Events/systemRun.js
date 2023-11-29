import Server from '../server';
import Config from '../conf/Configuration';
import { LogWarn } from '../Modules/Log/Log';

Server.System.runInterval( () => {
    Server.world.getAllPlayers().forEach(player => {
let gms = "survival"
//gamemode s @a[m=1,tag=!Adminer]
if ((player.gamemode == "creative") && !player.hasTag(Config.gmc)) {
    player.gamemode = gms
    LogWarn(`${player.name} estaba en creativo!!!`)
}
let statusNotify = Database.get("Notify", player)
if (statusNotify && !player.hasTag("Notify")) {
    player.addTag("Notify")
}
if ((statusNotify == false) && player.hasTag("Notify")) {
    player.removeTag("Notify")
}
    })
}, 20)

Server.System.runInterval( () => {
Database.set("coliseoManager", true)
},3000)
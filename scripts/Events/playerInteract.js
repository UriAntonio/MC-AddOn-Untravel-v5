import Server from "../server";
import { coliseoCost } from "../Estructuras/Coliseo/coliseoManager";
import { getWorldCooldown } from "../Modules/Tempo/Cooldown";




Server.world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    const { block, itemStack, player } = event;
    if (block.typeId === "minecraft:chest" && player.hasTag("lockChest")) {
        player.sendMessage(`§a■§cNo tienes permisos aqui`)
        event.cancel = true;
    }


    if (block.typeId === "minecraft:chemistry_table") {
        event.cancel = true;
        if (Database.get("coliseoManager") == true) {
            if (!player.isAdmin()) return
            if (getWorldCooldown("coliseo", Database.get("coliseoCooldown")) > 0) return player.sendMessage(`§a■§cEl Coliseo Ya esta en uso, espera: ${getWorldCooldown("coliseo", Database.get("coliseoCooldown"))}s.`)
            //if (player.isPunish) return player.sendMessage("§a■§cNo puedes usar el Coliseo pues estas Castigado")
            //if (player.isAdmin()) return Coliseo(player)
            coliseoCost(player)
        } else {
            player.sendMessage("§a■§cEl Coliseo esta desactivado")
        }


    }
}
)
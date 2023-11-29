import Server from "../server";
import { Coliseo } from "../Estructuras/Coliseo/coliseoManager";




Server.world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    const { block, itemStack, player } = event;
    if (block.typeId === "minecraft:chest" && player.hasTag("lockChest")) {
        player.sendMessage(`§a■§cNo tienes permisos aqui`)
        event.cancel = true;
    }
    if (block.typeId === "minecraft:chemistry_table" && Database.get("coliseoManager") == true) {
        Coliseo(player)
        Database.set("coliseoManager", false)
        event.cancel = true;
    }
}
)
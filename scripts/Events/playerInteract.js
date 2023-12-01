import Server from "../server";
import { coliseoCost } from "../Estructuras/Coliseo/coliseoManager";




Server.world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    const { block, itemStack, player } = event;
    if (block.typeId === "minecraft:chest" && player.hasTag("lockChest")) {
        player.sendMessage(`§a■§cNo tienes permisos aqui`)
        event.cancel = true;
    }


    if (block.typeId === "minecraft:chemistry_table") {
        event.cancel = true;
        if (Database.get("coliseoManager") == true) {

            coliseoCost(player)
        } else {
            player.sendMessage("§a■§cEl Coliseo esta desactivado")
        }
        
        
    }
}
)
import Server from "../server";

Server.world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    const { block, itemStack, player } = event;
    if ( block.typeId === "minecraft:chest" && player.hasTag("lockChest")) {
        Server.sendMsgToPlayer(player, `§aNo tienes permisos`)
            event.cancel = true;
    }
  })
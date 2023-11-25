import Server from "../server";

Server.world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    const { block, itemStack, player } = event;
    if ( block.typeId === "minecraft:chest" && player.hasTag("lockChest")) {
        player.sendMessage(`§a■§cNo tienes permisos aqui`)
            event.cancel = true;
    }
  })
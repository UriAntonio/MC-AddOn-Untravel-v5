import Server from "../server"

Server.Minecraft.world.afterEvents.entityDie.subscribe((data) => {
  if (data.deadEntity.isValid() && data.deadEntity.typeId === "minecraft:player") {
    let player = data.deadEntity
    const backData = {
      x: Math.floor(player.location.x),
      y: Math.floor(player.location.y),
      z: Math.floor(player.location.z),
      dimension: player.dimension.id
    }
    Server.BackDB.set(player.name, backData)
    player.sendMessage(`§c${player.location.x}, ${player.location.y}, ${player.location.z}`)

  }
})
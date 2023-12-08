import { Log } from "../Modules/Log/Log";
import Untravel from "../Untravel"

Untravel.Minecraft.world.afterEvents.entityDie.subscribe((data) => {
  if (data.deadEntity.isValid() && data.deadEntity.typeId === "minecraft:player") {
    let player = data.deadEntity
    if ((Untravel.Setting.get("backSystem") ?? true) == false) return player.sendMessage(`§a■§3Moriste en: §c${Math.floor(player.location.x)}, ${Math.floor(player.location.y)}, ${Math.floor(player.location.z)}`);
    const backData = {
      x: Math.floor(player.location.x),
      y: Math.floor(player.location.y),
      z: Math.floor(player.location.z),
      dimension: player.dimension.id
    }
    Untravel.BackDB.set(player.name, backData)
    player.sendMessage(`§1------------------------------\n§a■§3Moriste en: §c${Math.floor(player.location.x)}, ${Math.floor(player.location.y)}, ${Math.floor(player.location.z)}`)
    Log(`${player.name}murio en: §c${Math.floor(player.location.x)}, ${Math.floor(player.location.y)}, ${Math.floor(player.location.z)}`)
  }
})
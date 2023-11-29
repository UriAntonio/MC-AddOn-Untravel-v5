/**
 * Author: JaylyDev <https://github.com/JaylyDev>
 * Project: https://github.com/JaylyDev/ScriptAPI
 */
import { Player } from "@minecraft/server";
import Server from "../server";
import { Log } from "../Modules/Log/Log";

Server.world.afterEvents.entitySpawn.subscribe( async ({entity}) =>{
    // Since you cannot retrive projectile infomation from projectileHit event, we have to
  // subscribe to entitySpawn event to compare with the projectile information fired by projectileHit event.
  
  if (entity.typeId !== "minecraft:arrow") return;
  const callback = Server.world.afterEvents.projectileHitEntity.subscribe(async (arg) => {
    const {source, proyectile} = arg
    //source es el que dispara
    //hitInfo.entity es el golpeado
    const hitInfo = arg.getEntityHit()
    if (hitInfo?.entity instanceof Player && source instanceof Player) {
         /** @type {import("@minecraft/server").PlayerSoundOptions} */
         const soundoption = {
            volume: 0.4,
            pitch: 0.5,
         }
         //Log(` disparo ${source.nameTag} a ${hitInfo.entity.nameTag} `)
         source.playSound("random.orb", soundoption)
         Server.world.afterEvents.projectileHitEntity.unsubscribe(callback)
    }
  })
})
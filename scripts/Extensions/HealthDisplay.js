import { EntityHealthComponent, Player, system, world } from "@minecraft/server";
import untravel from "./untravel";
/** 
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const health = player.getComponent(EntityHealthComponent.componentId);
        player.nameTag = `${player.name}\n§c${health.currentValue.toFixed(1)}`;
    }
});
*/

const entityList = 'minecraft:chicken,minecraft:cow,minecraft:sheep'
const { symbols: { heart } } = untravel

const cache = new Map()
world.setDynamicProperty("Types", entityList)

world.afterEvents.entitySpawn.subscribe((data) => {
    let Types = world.getDynamicProperty("Types").split(",")
    if (!Types.includes(data.entity.typeId)) {
        return
    } else {
        if (data.entity.getDynamicProperty("stack") >= 0) {
            return
        }
        data.entity.setDynamicProperty("stack", 0)
    }
})

/**
 * 
 * @param {import("@minecraft/server").Entity} entity 
 * @param {import("@minecraft/server").Vector3} location 
 * @returns 
 */
function closestSameMods(entity, location) {
    if (entity instanceof Player) return null;
    const typeId = entity.typeId;
    const options = {
        type: typeId,
        location: location,
        maxDistance: 5,
        minDistance: 0.5
    };
    return entity.dimension.getEntities(options);
}

/**
 * 
 * @param {import("@minecraft/server").Entity} entity 
 * @param {*} entitiesAround 
 * @returns 
 */
function stackEntities(entity, entitiesAround) {
    let entityStack = entity.getDynamicProperty("stack")
    if (entityStack > 0) {
        entity.nameTag += `${entity.typeId.split(":")[1]} [${entityStack}]`;
    }
    if (entitiesAround[0].getDynamicProperty("stack") <= entityStack) {
        if (entitiesAround[0].getDynamicProperty("stack") == 0) {
            entity.setDynamicProperty("stack", entityStack + 1)
            entitiesAround[0].remove()
            entity.nameTag += `${entity.typeId.split(":")[1]} [${entityStack}]`;
            return
        }
        if (entitiesAround[0].getDynamicProperty("stack") >= 1) {
            entity.setDynamicProperty("stack", entityStack + entitiesAround[0].getDynamicProperty("stack"))
            entitiesAround[0].remove()
            entity.nameTag += `${entity.typeId.split(":")[1]} [${entityStack}]`;
            return
        }
    }
}

function formName(id) {
    if (cache.has(id)) return cache.get(id)
    const arr = id
        .split(":", 2)[1]
        .split("_");
    const str = arr.map(x => x.charAt(0).toUpperCase() + x.substring(1)).join(" ")
    cache.set(id, str)
    return str
}
/**
 * @param {Player} entity
 */
system.runInterval(() => {
    for (const entity of world.getDimension("overworld").getEntities()) {
        if (!entity.hasComponent("health")) continue
        if (entity instanceof Player) {
            //const { name, mx: { formatedHealth, maxHealth}} = entity
            const name = entity.name
            const formatedHealth = entity.getformatedHealth()
            const maxHealth = entity.getmaxHealth()
            entity.nameTag = `${name}\n§c${formatedHealth}/${maxHealth}${heart}§r`
        } else {
            if (world.getDynamicProperty("Types").split(",").includes(entity.typeId)) {
                const comp = entity.getComponent("health")
                //const hunger = entity.setProperty("")
                const closestEntities = closestSameMods(entity, entity.location);
                entity.nameTag = `§c${formName(entity.typeId)} ${(comp.currentValue).toFixed()}/${comp.defaultValue}${heart}§r  [${entity.getDynamicProperty("stack")}]`
                if (closestEntities.length > 0) {
                    stackEntities(entity, closestEntities);
                    entity.dimension.runCommand('kill @e[r=100,x=0,y=-10000,z=0]')
                }
                continue
            } else {
                /**@type {EntityHealthComponent} */
                const comp = entity.getComponent("health")
                entity.nameTag = `${formName(entity.typeId)} ${(comp.currentValue).toFixed()}/${comp.defaultValue}${heart}§r`
            }


        }
    }
}, 5)


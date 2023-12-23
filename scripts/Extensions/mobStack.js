import { world, Player, system, Container} from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

const entityList = 'minecraft:chicken,minecraft:cow,minecraft:sheep'

world.setDynamicProperty("Types", entityList)
world.afterEvents.entitySpawn.subscribe((data) => {
    let Types = world.getDynamicProperty("Types").split(",")
    if (!Types.includes(data.entity.typeId)) {
        return
    } else {
        if (data.entity.getDynamicProperty("stack")>= 0){
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
        entity.nameTag = `${entity.typeId.split(":")[1]} [${entityStack}]`;
    }
    if (entitiesAround[0].getDynamicProperty("stack") <= entityStack) {
        if (entitiesAround[0].getDynamicProperty("stack") == 0) {
            entity.setDynamicProperty("stack", entityStack + 1)
            entitiesAround[0].remove()
            entity.nameTag = `${entity.typeId.split(":")[1]} [${entityStack}]`;
            return
        }
        if (entitiesAround[0].getDynamicProperty("stack") >= 1) {
            entity.setDynamicProperty("stack", entityStack + entitiesAround[0].getDynamicProperty("stack"))
            entitiesAround[0].remove()
            entity.nameTag = `${entity.typeId.split(":")[1]} [${entityStack}]`;
            return
        }
    }
}


system.runInterval(() => {
    const overworldEntities = world.getDimension('overworld').getEntities();
    overworldEntities.forEach(entity => {
        if (!entity.isValid()) return
        if (!world.getDynamicProperty("Types").split(",").includes(entity.typeId)) return;
        const closestEntities = closestSameMods(entity, entity.location);
        entity.nameTag = `${entity.typeId.split(":")[1]} [${entity.getDynamicProperty("stack")}]`;
        if (closestEntities.length > 0) {
            stackEntities(entity, closestEntities);
            entity.dimension.runCommand('kill @e[r=100,x=0,y=-10000,z=0]')
        }
    });
}, 5);

world.afterEvents.entityDie.subscribe((event) => {
    const { deadEntity: entity } = event
    const player = event.damageSource.damagingEntity
    if (!(entity.isValid())) return
    if (event.damageSource.cause == 'suicide') return
    if (entity.getDynamicProperty("stack") >= 1){
        let newentity = entity.dimension.spawnEntity(entity.typeId, entity.location)
        newentity.setDynamicProperty("stack",entity.getDynamicProperty("stack") - 1)
    }
})
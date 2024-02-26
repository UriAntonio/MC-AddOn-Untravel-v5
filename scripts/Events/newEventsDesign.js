import { world, Entity } from "@minecraft/server";
/**
 * 
 * @param {Entity} entity 
 * @param {*} amount 
 */
const addHealth = (entity, amount) => {
    try {
        let component = entity.getComponent("health");
        component.setCurrentValue(component.currentValue + amount)
    } catch (error) {
        console.log(error)
    }
}

world.afterEvents.playerInteractWithEntity.subscribe(e => {
    
    const { player, target } = e;
    const { itemStack } = e;
    if (!itemStack || itemStack.typeId !== "minecraft:stick") return
    let component = (target.getComponent("minecraft:tameable") || target.getComponent("minecraft:tamemount"));
    if (!component) return player.sendMessage({ rawtext: [{ text: "§c" }, { translate: "tameEvent.error.componentNotFound" }] });
    addHealth(target, 1);
    if (component.typeId == "minecraft:tameable") {
        return player.sendMessage({
            true: {
                rawtext: [
                    { text: "§e" }, { translate: `entity.${target.typeId.replace("minecraft:", "")}.name` }, { translate: "tameEvent.succes.tameable" }]
            }, false: { rawtext: [{ text: "§c" }, { translate: "tameEvent.error.operation" }] }
        }[component.tame()]), player.getComponent("minecraft:inventory").container.setItem(player.selectedSlot)
    };
    try {
        component.setTamed(true); player.sendMessage({rawtext: [{text: "§e" },{translate: "tameEvent.succes.tamemount" }] });
    } catch (error) {
        player.sendMessage({rawtext: [{text: "§e" }, {translate: "tameEvent.error.operation" }] });
    }
})


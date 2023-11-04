import { world, EntityType,} from "@minecraft/server";
import { cfg } from "../conf/config";


const World = world;

function registry(data) {

    /**
     * Define property first
     * Register property second
     * Set property third
     */
    //Define las propiedades para un Wolrd Border
    property.defineNumber("worldborder_n");
    property.defineNumber("worldborder_nether_n");
    property.defineBoolean("worldborder_b");
    // Define las propiedades para alfa
    personal.defineString("alfa", 200);
    // Define las propiedades para omega
    personal.defineString("omega", 200);

    // Register Defined properties in world globally
    data.propertyRegistry.registerWorldDynamicProperties(property);
    // Register Defined properties in entity globally
    data.propertyRegistry.registerEntityTypeDynamicProperties(personal, EntityType.player);
    // Asignar propiedades del World Border
    let worldborder_n = World.getDynamicProperty("worldborder_n");
    if (worldborder_n === undefined) {
        World.setDynamicProperty("worldborder_n", cfg.modules.worldBorder.overworld);
    }
    let worldborderNether_n = World.getDynamicProperty("worldborder_nether_n");
    if (worldborderNether_n === undefined) {
        World.setDynamicProperty("worldborder_nether_n", cfg.modules.worldBorder.nether);
    }
    let worldborder_b = World.getDynamicProperty("worldborder_b");
    if (worldborder_b === undefined) {
        World.setDynamicProperty("worldborder_b", cfg.modules.worldBorder.enabled);
    }
}





const Registry = () => {
    World.afterEvents.worldInitialize.subscribe((data) => registry(data))
}
export { Registry };
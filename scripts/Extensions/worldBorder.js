import { Player, system, world } from "@minecraft/server";
import Setting from "../Modules/Land/Setting.js"
import  Config  from  "../Commands/Configuration.js"
import Untravel from "../Untravel.js";
//import { MinecraftBlockTypes } from "../../node_modules/@minecraft/vanilla-data/lib/index.js";


/**
 * Asegurate de no hacerte TP en un bloque sólido
 * @param {Player} player 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 */
const safetyProtocol = (player, x, y, z) => {
    const testPosition = [
        { x: x, y: y + 1, z: z }, //Head position
        { x: x, y: y, z: z }, //Body position
        { x: x, y: y - 1, z: z }, //
    ];

    let safe = null;
    let consecutiveAir = 0;

    for (const position of testPosition) {
        const block = player.dimension.getBlock(position);
        if (block?.isAir) {
            consecutiveAir++;
        } else {
            consecutiveAir = 0
        }
    }

    if (consecutiveAir === testPosition.length) {
        console.log(testPosition.length) //
        safe = testPosition[0].y;
    }

    return safe;
}

const worldborder = (id) => {

    
    //Get Bolean Property
    const worldBorderBoolean = Setting.get("BorderOn")

    const worldBorderOverworldNumber = Setting.get("overworld")
    const worldBorderNetherNumber = Setting.get("nether")
    const worldBorderEndNumber = Setting.get("end")

    // Unsubscribe if disabled in-game
    if (worldBorderBoolean === false) {
        system.clearRun(id);
        return;
    }
    const players = world.getPlayers();
    for (const player of players) {
        //Get unique Id
        //const uniqueId = dynamicPropertyRegistry.get(player?.id);
        // Skip if they have permission
        // if (player.isAdmin()) {
        //     continue;
        // }
        //if (uniqueId === player.name) {
        //    continue;
        //}
        // What is it currently set to

        let overworldSize = (Number.isInteger(worldBorderOverworldNumber)) ? worldBorderOverworldNumber : Config.overworld
        let netherSize = (Number.isInteger(worldBorderNetherNumber)) ? worldBorderNetherNumber : Config.nether
        let endSize = (Number.isInteger(worldBorderEndNumber)) ? worldBorderEndNumber : Config.end

        // Make sure it's not a negative
        if (overworldSize < 0) {
            overworldSize = Math.abs(overworldSize);
        }
        if (netherSize < 0) {
            netherSize = Math.abs(netherSize);
        }
        if (endSize < 0) {
            endSize = Math.abs(endSize);
        }

        // If overworld or nether is 0 then ignore
        if ((overworldSize === 0 && player.dimension.id === "minecraft:overworld") || (netherSize === 0 && player.dimension.id === "minecraft:nether") || (endSize === 0 && player.dimension.id === "minecraft:the_end")) {
            continue;
        }

        const { x, y, z } = player.location;

        const blockCoords = [
            [x, y - 1, z],
            [x, y - 1, z + 1],
            [x, y - 1, z - 1],
            [x + 1, y - 1, z],
            [x - 1, y - 1, z],
            [x, y, z],
            [x, y, z + 1],
            [x, y, z - 1],
            [x + 1, y, z],
            [x - 1, y, z],
        ];

        const portalBlocks = {};
        for (const [x, y, z] of blockCoords) {
            const block = player.dimension.getBlock({ x: x, y: y, z: z })
            portalBlocks[`${x},${y},${z}`] = block?.typeId ?? "minecraft:air";
        }
        //if (portalBlocks[MinecraftBlockTypes.Portal] || portalBlocks[`${x},${y - 1},${z}`] === MinecraftBlockTypes.Air) {
        //    Untravel.setTimer(player.id);
        //    continue;
        //}

        //Overworld
        if (player.dimension.id === "minecraft:overworld") {
            const border = overworldSize - 3;
            const { x, y, z, } = player.location;

            //Asegrate que nadie esta escalando sobre el muro
            if (x > overworldSize || x < -overworldSize || z > overworldSize || z < -overworldSize) {
                player.sendMsgToPlayer(`§bEstas en el limite del Mundo.`);

                const teleportToBorder = (x, z) => {
                    const safe = safetyProtocol(player, x, y, z);
                    Untravel.setTimer(player.id);
                    player.teleport({ x: x, y: safe, z: z }, { dimension: player.dimension, rotation: { x: 0, y: 0 }, facingLocation: { x: 0, y: 0, z: 0 }, checkForBlocks: false, keepVelocity: false });
                };

                const targetX = x < -overworldSize ? -border + 6 : x >= overworldSize ? border - 6 : x;
                const targetZ = z < -overworldSize ? -border + 6 : z >= overworldSize ? border - 6 : z;
                teleportToBorder(targetX, targetZ);
            }
        }

        // Nether
        if (player.dimension.id === "minecraft:nether") {
            const border = netherSize - 3;
            const { x, y, z } = player.location;

            // Make sure nobody climbs over the wall
            if (x > netherSize || x < -netherSize || z > netherSize || z < -netherSize) {
                player.sendMsgToPlayer(`§bEstas en el limite del Mundo.`);

                const teleportToBorder = (x, z) => {
                    const safe = safetyProtocol(player, x, y, z);
                    Untravel.setTimer(player.id);
                    player.teleport({ x: x, y: safe, z: z }, { dimension: player.dimension, rotation: { x: 0, y: 0 }, facingLocation: { x: 0, y: 0, z: 0 }, checkForBlocks: false, keepVelocity: false });
                };

                const targetX = x < -netherSize ? -border + 6 : x >= netherSize ? border - 6 : x;
                const targetZ = z < -netherSize ? -border + 6 : z >= netherSize ? border - 6 : z;
                teleportToBorder(targetX, targetZ);
            }
        }

         // End
         if (player.dimension.id === "minecraft:the_end") {
            const border = endSize - 3;
            const { x, y, z } = player.location;

            // Make sure nobody climbs over the wall
            if (x > endSize || x < -endSize || z > endSize || z < -endSize) {
                player.sendMsgToPlayer(`§bEstas en el limite del Mundo.`);

                const teleportToBorder = (x, z) => {
                    const safe = safetyProtocol(player, x, y, z);
                    Untravel.setTimer(player.id);
                    player.teleport({ x: x, y: safe, z: z }, { dimension: player.dimension, rotation: { x: 0, y: 0 }, facingLocation: { x: 0, y: 0, z: 0 }, checkForBlocks: false, keepVelocity: false });
                };

                const targetX = x < -endSize ? -border + 6 : x >= endSize ? border - 6 : x;
                const targetZ = z < -endSize ? -border + 6 : z >= endSize ? border - 6 : z;
                teleportToBorder(targetX, targetZ);
            }
        }
    }
}

/**
 * We store the identifier in a variable
 * to cancel the execution of this scheduled run
 * if needed to do so.
 */
export const WorldBorder = ()=> {
    const worldborderId = system.runInterval(() => {
        worldborder(worldborderId);
    }, 20);
}
import { Dimension, Player } from "@minecraft/server";
import FunctionQueue from "./FunctionQueue";
import { DB } from "../DataBase/UntravelDB";

// Credit: justskydev

const functionQueue = new FunctionQueue()

const LandDB = new DB("landDB")
// LandDB.clear()

const Land = {}

/**
 * Create land
 * @param {Player} player 
 * @param {{x: number, z: number}} start 
 * @param {{x: number, z: number}} end 
 * @returns {{ created: boolean, overlapInfo: {isInside: boolean, landOwner: string | null} | null }}
 */
Land.createLand = async (player, start, end) => {
  return await functionQueue.enqueue(() => {
    const creationDate = new Date();
    const id = Date.now()
    const center = Land.getCenter(start, end);
    const landStructure = {
      landId: id,
      landOwner: player.name,
      landDimension: player.dimension.id,
      creationDate: creationDate.toLocaleString(),
      landCenter: center,
      land: { start, end },
      invites: [],
      landSetting: {
        building: false,
        breaking: false,
        openContainer: false,
        openDoor: false,
        pushButton: false
      }
    };

    const checkOverlap = Land.checkOverlap(start, end, player)
    if (checkOverlap.isInside)
      return { created: false, overlapInfo: checkOverlap };
    LandDB.set(`${player.name}-${id}`, landStructure);
    return { created: true, overlapInfo: null };
  })
}

/**
 * Calculate Center land
 * @param {import("@minecraft/server").Vector3} start 
 * @param {import("@minecraft/server").Vector3} end 
 * @returns {{x: number, z: number}}
 */
Land.getCenter = (start, end) => {
  const centerX = (start.x + end.x) / 2;
  const centerZ = (start.z + end.z) / 2;
  return { x: centerX, z: centerZ };
}

/**
 * Delete land
 * @param {string} landId 
 * @param {string} playerName 
 * @returns {{status: boolean, error: string | null}}
 */
Land.deleteLand = async (landId, playerName) => {
  return await functionQueue.enqueue(() => {
    const land = LandDB.get(`${playerName}-${landId}`)
    if (!land)
      return { deleted: false, error: "NotFound" };
    if (land.landOwner !== playerName)
      return { deleted: false, error: "PermissionError" };

    LandDB.delete(`${playerName}-${landId}`);
    return { deleted: true, error: null };
  })
}

/**
 * Get player's lands
 * @param {string} playerName
 * @returns {{landId: string,landOwner: string,landDimension: string,creationDate: string,landCenter: {x: number, z: number},land: { start: {x: number, z: number}, end: {x: number, z: number} },invites: string[]}[]}
 */
Land.getLands = (playerName) => {
  const playerLands = [];
  LandDB.forEach((key, value) => {
    if (key.split("-")[0] == playerName) playerLands.push(value)
  })
  return playerLands;
}

Land.getAllLands = () => {
  const land = {}
  LandDB.forEach((key, value) => {
    let playerName = key.split("-")[0]
    if (!land[playerName]) land[playerName] = []
    land[playerName].push(value)
  })
  return land
}

/**
 * Invite player
 * @param {string} landId 
 * @param {string} playerName 
 * @param {string} targetName 
 * @returns {{status: boolean, error: string | null}}
 */
Land.invitePlayer = async (landId, playerName, targetName) => {
  return await functionQueue.enqueue(() => {
    const land = LandDB.get(`${playerName}-${landId}`)
    if (!land) return { status: false, error: "NotFound" };
    if (land.landOwner !== playerName)
      return { status: false, error: "PermissionError" };

    const updatedInvites = [...land.invites, targetName];
    const updatedLand = { ...land, invites: updatedInvites };

    LandDB.set(`${playerName}-${landId}`, updatedLand);

    return { status: true, error: null };
  })
}

/**
 * Remove invite
 * @param {string} landId 
 * @param {string} playerName 
 * @param {string} targetName 
 * @returns {{status: boolean, error: string | null}}
 */
Land.removeInvite = async (landId, playerName, targetName) => {
  return await functionQueue.enqueue(() => {
    const land = LandDB.get(`${playerName}-${landId}`)
    if (!land)
      return { status: false, error: "NotFound" };
    if (!land.invites.includes(targetName))
      return { status: false, error: "PlayerNotFound" };
    if (land.landOwner !== playerName)
      return { status: false, error: "PermissionError" };

    const updatedInvites = land.invites.filter((invite) => invite !== targetName);
    const updatedLand = { ...land, invites: updatedInvites };

    LandDB.set(`${playerName}-${landId}`, updatedLand);

    return { status: true, error: null };
  })
}

/**
 * Remove invite
 * @param {string} landId 
 * @param {string} playerName 
 * @param {LandSetting} settingData 
 * @returns {{status: boolean, error: string | null}}
 */
Land.setSetting = async (landId, playerName, settingData) => {
  return await functionQueue.enqueue(() => {
    const land = LandDB.get(`${playerName}-${landId}`)
    if (!land)
      return { status: false, error: "NotFound" };
    if (land.landOwner !== playerName)
      return { status: false, error: "PermissionError" };

    land.landSetting = settingData

    LandDB.set(`${playerName}-${landId}`, land);

    return { status: true, error: null };
  })
}

/**
 * Remove invite
 * @param {string} landId 
 * @param {string} playerName 
 * @param {string} targetName 
 * @returns {{status: boolean, error: string | null}}
 */
Land.transferOwnership = async (landId, playerName, targetName) => {
  return await functionQueue.enqueue(() => {
    const land = LandDB.get(`${playerName}-${landId}`)
    if (!land)
      return { status: false, error: "NotFound" };
    if (land.landOwner !== playerName)
      return { status: false, error: "PermissionError" };

    let newId = Date.now()
    land.landId = newId
    land.landOwner = targetName
    LandDB.delete(`${playerName}-${landId}`);
    LandDB.set(`${targetName}-${newId}`, land);

    return { status: true, error: null };
  })
}

/**
 * Check overlap
 * @param {import("@minecraft/server").Vector3} start 
 * @param {import("@minecraft/server").Vector3} end 
 * @param {Player} player 
 * @returns {{isInside: boolean, landOwner: string | null}}
 */
Land.checkOverlap = (start, end, player) => {
  for (const [, existingLand] of LandDB.entries()) {
    const { start: existingStart, end: existingEnd } = existingLand.land;
    if (existingLand.landDimension !== player.dimension.id) continue;
    const isInside =
      Math.min(start.x, end.x) <= Math.max(existingStart.x, existingEnd.x) &&
      Math.max(start.x, end.x) >= Math.min(existingStart.x, existingEnd.x) &&
      Math.max(start.z, end.z) >= Math.min(existingStart.z, existingEnd.z) &&
      Math.min(start.z, end.z) <= Math.max(existingStart.z, existingEnd.z);
    if (isInside)
      return {
        isInside,
        landOwner: existingLand.landOwner,
      };
  }
  return {
    isInside: false,
    landOwner: null,
  };
}

/**
 * Test Player if in Land
 * @param {import("@minecraft/server").Vector3} position
 * @param {Dimension} dimension
 * @returns {{isInside: boolean, owner: string | null, invites: string[] | null, id: string | null, data: {landId: string,landOwner: string,landDimension: string,creationDate: string,landCenter: {x: number, z: number},land: { start: {x: number, z: number}, end: {x: number, z: number} },invites: string[]} || null}}
 */
Land.testLand = (position, dimension) => {
  for (const [, land] of LandDB.entries()) {
    const { start, end } = land.land;
    if (land.landDimension !== dimension.id) continue;
    const isInside =
      position.x >= Math.min(start.x, end.x) &&
      position.x <= Math.max(start.x, end.x) &&
      position.z >= Math.min(start.z, end.z) &&
      position.z <= Math.max(start.z, end.z)
    if (isInside)
      return {
        isInside,
        owner: land.landOwner,
        invites: land.invites,
        id: land.landId,
        setting: land.landSetting ?? {
          building: false,
          breaking: false,
          openContainer: false,
          openDoor: false,
          pushButton: false,
          useLever: false,
          interactWithMobs: false,
        },
        data: land
      };
  }
  return {
    isInside: false,
    owner: null,
    invites: [],
    id: null
  };
}

/**
 * Calculate Land Size
 * @param {import("@minecraft/server").Vector3} start 
 * @param {import("@minecraft/server").Vector3} end 
 * @returns {number}
 */
Land.calculateLandSize = (start, end) => {
  const width = Math.abs(end.x - start.x) + 1;
  const depth = Math.abs(end.z - start.z) + 1;
  return width * depth;
}

export default Land
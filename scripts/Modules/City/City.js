import { Dimension, Player } from "@minecraft/server";
import FunctionQueue from "./../Land/FunctionQueue";
import { DB } from "../DataBase/UntravelDB";
import Faction from "../Faction/Faction";

// Credit: justskydev

const functionQueue = new FunctionQueue()

const CityDB = new DB("cityDB")
// CityDB.clear()

const City = {}

/**
 * Create city
 * @param {Player} player 
 * @param {{x: number, z: number}} start 
 * @param {{x: number, z: number}} end
 * @param {string} name
 * @param {number} free tiempo libre apara poder reclamarla
 * @param {number} dias dias para ser ocupada
 * @param {number} tax porcentage de impuestos
 * @returns {{ created: boolean, overlapInfo: {isInside: boolean, cityOwner: string | null} | null }}
 */
City.createCity = async (player, start, end, name, free, dias, tax) => {
  return await functionQueue.enqueue(() => {
    const creationDate = new Date();
    const id = Date.now()
    const center = City.getCenter(start, end)
    const minToMilseg = (free * 60) * 1000
    const daysToMilSeg = (dias * 86400) * 1000
    const cityStructure = {
      cityId: id,
      cityName: name,
      cityOwner: "Sin Dueño",
      cityDimension: player.dimension.id,
      creationDate: creationDate.toLocaleString(),
      cityTax: tax,
      cityTimeFree: {
        set: minToMilseg,
        time: 0
      },
      cityTimeOcuped: {
        set: daysToMilSeg,
        time: 0
      },
      cityCenter: center,
      city: { start, end },
      allies: [],
      citySetting: {
        openContainer: false,
        openDoor: false,
        pushButton: false
      }
    };

    const checkOverlap = City.checkOverlap(start, end, player)
    if (checkOverlap.isInside)
      return { created: false, overlapInfo: checkOverlap };
    CityDB.set(`${name}-${id}`, cityStructure);
    return { created: true, overlapInfo: null };
  })
}

/**
 * Calculate Center City
 * @param {import("@minecraft/server").Vector3} start 
 * @param {import("@minecraft/server").Vector3} end 
 * @returns {{x: number, z: number}}
 */
City.getCenter = (start, end) => {
  const centerX = (start.x + end.x) / 2;
  const centerZ = (start.z + end.z) / 2;
  return { x: centerX, z: centerZ };
}

/**
 * Delete city
 * @param {string} cityId 
 * @param {string} cityName
 * @returns {{status: boolean, error: string | null}}
 */
City.deleteCity = async (cityId, cityName) => {
  return await functionQueue.enqueue(() => {
    const city = CityDB.get(`${cityName}-${cityId}`)
    if (!city)
      return { deleted: false, error: "NotFound" };
    CityDB.delete(`${cityName}-${cityId}`);
    return { deleted: true, error: null };
  })
}

/**
 * Get factions's City's
 * @param {string} playerName
 * @type {Array} cities
 * @returns {{cityId: string,cityOwner: string,cityDimension: string,creationDate: string,cityCenter: {x: number, z: number},city: { start: {x: number, z: number}, end: {x: number, z: number} },invites: string[]}[]}
 */
City.getCitys = (faction) => {
  const factionCitys = [];
  Faction.DB.forEach((key, value) => {
    if (key == faction) {
      let cities = value.cities
      CityDB.forEach((key2, value2) => {
        if (cities.includes(key2.split("-")[0])) {
          factionCitys.push(value2)
        }
      })
    }
  })
  return factionCitys;
}

City.getAllCitys = () => {
  const city = {}
  CityDB.forEach((key, value) => {
    let cityName = key.split("-")[0]
    if (!city[cityName]) city[cityName] = []
    city[cityName].push(value)
  })
  return city
}

/**
 * Invite player
 * @param {string} cityId 
 * @param {string} cityName
 * @param {string} targetFaction 
 * @param {Player} player
 * @returns {{status: boolean, error: string | null}}
 */
City.inviteAllies = async (cityId, cityName, targetFaction, player) => {
  return await functionQueue.enqueue(() => {
    const city = CityDB.get(`${cityName}-${cityId}`)
    const PlayerFaction = player.faction
    if (!city) return { status: false, error: "NotFound" };
    if (!PlayerFaction.status) return { status: false, error: "NotFaction" }
    const faction = Faction.DB.get(PlayerFaction)
    let permiso = player.factionPermiss(faction)
    if (city.cityOwner !== PlayerFaction)
      return { status: false, error: "PermissionError" };
    if (!permiso.status)
      return { status: false, error: "PermissionDenied" };
    const updatedInvites = [...city.allies, targetFaction];
    const updatedCity = { ...city, allies: updatedInvites };

    CityDB.set(`${cityName}-${cityId}`, updatedCity);

    return { status: true, error: null };
  })
}

/**
 * Remove invite
 * @param {string} cityId 
 * @param {string} name  city
 * @param {string} factionName name of faction to remove
 * @returns {{status: boolean, error: string | null}}
 */
City.removeInvite = async (cityId, name, factionName, player) => {
  return await functionQueue.enqueue(() => {
    const city = CityDB.get(`${name}-${cityId}`)
    const PlayerFaction = player.faction
    if (!city)
      return { status: false, error: "NotFound" };
    if (!PlayerFaction) return { status: false, error: "NotFaction" }
    const faction = Faction.DB.get(PlayerFaction)
    let permiso = player.factionPermiss(faction)
    if (!city.allies.includes(factionName))
      return { status: false, error: "PlayerNotFound" };
    if (city.cityOwner !== PlayerFaction)
      return { status: false, error: "PermissionError" };
    if (!permiso.status)
      return { status: false, error: "PermissionDenied" };
    const updatedAllies = city.allies.filter((invite) => invite !== factionName);
    const updatedCity = { ...city, allies: updatedAllies };

    CityDB.set(`${name}-${cityId}`, updatedCity);

    return { status: true, error: null };
  })
}

/**
 * Set settings City
 * @param {string} cityId 
 * @param {string} cityName 
 * @param {CitySetting} settingData 
 * @param {Player} player
 * @returns {{status: boolean, error: string | null}}
 */
City.setSetting = async (cityId, cityName, settingData, player) => {
  return await functionQueue.enqueue(() => {
    const PlayerFaction = player.faction
    const city = CityDB.get(`${cityName}-${cityId}`)
    if (!city)
      return { status: false, error: "NotFound" };
    if (!PlayerFaction)
      return { status: false, error: "NotFaction" };
    if (city.cityOwner !== PlayerFaction)
      return { status: false, error: "PermissionError" };

    city.citySetting = settingData

    CityDB.set(`${cityName}-${cityId}`, city);

    return { status: true, error: null };
  })
}

/**
 * Establece la faccion dueña de la Ciudad
 * @param {string} cityId 
 * @param {string} cityName 
 * @param {string} factionName 
 * @returns {{status: boolean, error: string | null}}
 */
City.setOwnership = async (cityId, cityName, factionName) => {
  return await functionQueue.enqueue(() => {
    const city = CityDB.get(`${cityName}-${cityId}`)

    if (!city)
      return { status: false, error: "NotFound" };
    const faction = Faction.DB.get(PlayerFaction)
    if (!faction)
      return { status: false, error: "NotFaction" }

    let newDate = Date.now()
    let timeToBeOcuped = city.cityTimeOcuped.set
    let newTime = newDate + timeToBeOcuped
    city.cityTimeOcuped.time = newTime
    city.cityId = newDate
    city.cityOwner = factionName
    CityDB.set(`${cityName}-${newId}`, city);

    return { status: true, error: null };
  })
}
/**
 * Elimina la faccion dueña de la Ciudad
 * @param {string} cityId 
 * @param {string} cityName 
 * @param {string} cityName 
 * @returns {{status: boolean, error: string | null}}
 */
City.deleteOwnership = async (cityId, cityName) => {
  return await functionQueue.enqueue(() => {
    const city = CityDB.get(`${cityName}-${cityId}`)
    if (!city)
      return { status: false, error: "NotFound" };

    let newDate = Date.now()
    let timeToBeFree = city.cityTimeFree.set
    let newTime = newDate + timeToBeFree
    city.cityTimeFree.time = newTime
    city.cityOwner = targetName
    CityDB.set(`${cityName}-${cityId}`, city);

    return { status: true, error: null };
  })
}

/**
 * Check overlap
 * @param {import("@minecraft/server").Vector3} start 
 * @param {import("@minecraft/server").Vector3} end 
 * @param {Player} player 
 * @returns {{isInside: boolean, cityOwner: string | null}}
 */
City.checkOverlap = (start, end, player) => {
  for (const [, existingCity] of CityDB.entries()) {
    const { start: existingStart, end: existingEnd } = existingCity.city;
    if (existingCity.cityDimension !== player.dimension.id) continue;
    const isInside =
      Math.min(start.x, end.x) <= Math.max(existingStart.x, existingEnd.x) &&
      Math.max(start.x, end.x) >= Math.min(existingStart.x, existingEnd.x) &&
      Math.max(start.z, end.z) >= Math.min(existingStart.z, existingEnd.z) &&
      Math.min(start.z, end.z) <= Math.max(existingStart.z, existingEnd.z);
    if (isInside)
      return {
        isInside,
        cityOwner: existingCity.cityOwner,
      };
  }
  return {
    isInside: false,
    cityOwner: null,
  };
}

/**
 * Test Player if in city
 * @param {import("@minecraft/server").Vector3} position
 * @param {Dimension} dimension
 * @returns {{isInside: boolean, owner: string | null, invites: string[] | null, id: string | null, data: {cityId: string,cityOwner: string,cityDimension: string,creationDate: string,cityCenter: {x: number, z: number},city: { start: {x: number, z: number}, end: {x: number, z: number} },invites: string[]} || null}}
 */
City.testCity = (position, dimension) => {
  for (const [, city] of CityDB.entries()) {
    const { start, end } = city.city;
    if (city.cityDimension !== dimension.id) continue;
    const isInside =
      position.x >= Math.min(start.x, end.x) &&
      position.x <= Math.max(start.x, end.x) &&
      position.z >= Math.min(start.z, end.z) &&
      position.z <= Math.max(start.z, end.z)
    if (isInside)
      return {
        isInside,
        owner: city.cityOwner,
        allies: city.allies,
        id: city.cityId,
        setting: city.citySetting ?? {
          building: false,
          breaking: false,
          openContainer: false,
          openDoor: false,
          pushButton: false,
          useLever: false,
          interactWithMobs: false,
        },
        data: city
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
 * Calculate City Size
 * @param {import("@minecraft/server").Vector3} start 
 * @param {import("@minecraft/server").Vector3} end 
 * @returns {number}
 */
City.calculateCitySize = (start, end) => {
  const width = Math.abs(end.x - start.x) + 1;
  const depth = Math.abs(end.z - start.z) + 1;
  return width * depth;
}

export default City
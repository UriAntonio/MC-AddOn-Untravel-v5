import { Player } from "@minecraft/server";
import FunctionQueue from "./../Land/FunctionQueue";
import { DB } from "../DataBase/UntravelDB";


const functionQueue = new FunctionQueue()

const FactionDB = new DB("factionDB")


const Faction = {}
Faction.DB = FactionDB
Faction.player = new DB("player")
/**
 * Create Faction
 * @param {Player} player 
 * @param {string} name
 * @returns {{ created: boolean, overlapInfo: {sameName: boolean, factionLider: string | null} | null }}
 */
Faction.createfaction = async (player, name) => {
  return await functionQueue.enqueue(() => {
    const creationDate = new Date();
    const id = Date.now()
    const factionStructure = {
      factionId: id,
      factionName: name,
      factionLider: player.name,
      subliders: [],
      oficers: [],
      members: [],
      factionDimension: player.dimension.id,
      creationDate: creationDate.toLocaleString(),
      cities: [],
      mdr: 5,
      factionSetting: {
        close: false
      }
    };

    const checkDuplicate = Faction.checkDuplicate(name)
    if (checkDuplicate.sameName)
      return { created: false, overlapInfo: checkDuplicate };
    FactionDB.set(`${name}`, factionStructure);
    return { created: true, overlapInfo: null };
  })
}

/**
 * Delete Faction // Probablemente no se pueda eliminar mas adelante
 * @param {string} factionName 
 * @param {string} playerName
 * @returns {{status: boolean, error: string | null}}
 */
Faction.deleteFaction = async (factionName, playerName) => {
  return await functionQueue.enqueue(() => {
    const fact = FactionDB.get(`${factionName}`)
    if (!fact)
      return { deleted: false, error: "NotFound" };
    if (fact.factionLider !== playerName)
      return { deleted: false, error: "PermissionError" };

    FactionDB.delete(`${factionName}`);
    return { deleted: true, error: null };
  })
}

/**
 * Get player's Faction Info
 * @param {Player} player
 * @returns {{factionId: string,factionLider: string,subliders: string[],oficers: string[],members: string[],factionDimension: string,creationDate: string,cities: string[],mdr: number}[]}
 */
Faction.getFactionInfo = (player) => {
  const factionInfo = [];
  const playerFaction = player.faction
  if (!playerFaction)
    return factionInfo;
  FactionDB.forEach((key, value) => {
    if (key == playerFaction) factionInfo.push(value)
  })
  return factionInfo;
}

Faction.getAllFactions = () => {
  const faction = {}
  FactionDB.forEach((key, value) => {
    let factionName = key
    if (!faction[factionName]) faction[factionName] = []
    faction[factionName].push(value)
  })
  return faction
}

/**
 * Invite player 
 * @param {string} playerName 
 * @param {string} targetName 
 * @param {string} factionName
 * @returns {{status: boolean, error: string | null}}
 */
Faction.invitePlayer = async (playerName, targetName, factionName) => {
  return await functionQueue.enqueue(() => {
    const fact = FactionDB.get(`${factionName}`)
    if (!fact) return { status: false, error: "NotFound" };
    if (fact.factionLider !== playerName || !fact.subliders.includes(playerName) || !fact.oficers.includes(playerName))
      return { status: false, error: "PermissionError" };
    const updatedInvites = [...fact.members, targetName];
    const updatedFaction = { ...fact, members: updatedInvites };

    FactionDB.set(`${factionName}`, updatedFaction);

    return { status: true, error: null };
  })
}


/**
 * Remove member
 * @param {string} factionName 
 * @param {string} playerName 
 * @param {string} targetName 
 * @returns {{status: boolean, error: string | null}}
 */
Faction.removeMember = async (factionName, playerName, targetName) => {
  return await functionQueue.enqueue(() => {
    const fact = FactionDB.get(`${factionName}`)
    if (!fact)
      return { status: false, error: "NotFound" };
    if (!fact.members.includes(targetName))
      return { status: false, error: "PlayerNotFound" };
    if (fact.factionLider !== playerName || !fact.subliders.includes(playerName) || !fact.oficers.includes(playerName))
      return { status: false, error: "PermissionError" };

    const updatedInvites = fact.members.filter((invite) => invite !== targetName);
    const updatedFaction = { ...fact, members: updatedInvites };

    FactionDB.set(`${factionName}`, updatedFaction);

    return { status: true, error: null };
  })
}

/**
 * Set settings Faction
 * @param {string} factionName 
 * @param {string} playerName 
 * @param {factionSetting} settingData 
 * @returns {{status: boolean, error: string | null}}
 */
Faction.setSetting = async (factionName, playerName, settingData) => {
  return await functionQueue.enqueue(() => {
    const fact = FactionDB.get(`${factionName}`)
    if (!fact)
      return { status: false, error: "NotFound" };
    if (fact.factionLider !== playerName)
      return { status: false, error: "PermissionError" };

    fact.factionSetting = settingData

    FactionDB.set(`${factionName}`, fact);

    return { status: true, error: null };
  })
}

/**
 * Acender a Miembro
 * @param {string} factionName 
 * @param {string} playerName 
 * @param {string} targetName 
 * @returns {{status: boolean, error: string | null}}
 */
Faction.promoteMember = async (factionName, playerName, targetName) => {
  return await functionQueue.enqueue(() => {
    const fact = FactionDB.get(`${factionName}`)
    if (!fact)
      return { status: false, error: "NotFound" };
    if (fact.factionLider !== playerName) {
      //Sublider aciende Miembro a Oficial
      if (fact.subliders.includes(playerName) && fact.members.include(targetName)) {
        const updatedOficers = [...fact.oficers, targetName];
        const updatedMembers = fact.members.filter(member => member !== targetName)
        const updatedFaction = { ...fact, oficers: updatedOficers, members: updatedMembers };
        FactionDB.set(`${factionName}`, updatedFaction);
        return { status: true, error: null };
      }
      return { status: false, error: "PermissionError" };
    }
    //Aciende a Oficial
    if (fact.members.include(targetName)) {
      const updatedOficers = [...fact.oficers, targetName];
      const updatedMembers = fact.members.filter(member => member !== targetName)
      const updatedFaction = { ...fact, oficers: updatedOficers, members: updatedMembers };
      FactionDB.set(`${factionName}`, updatedFaction);
      return { status: true, error: null };
    }
    //Aciende a Sublider
    if (fact.oficers.include(targetName)) {
      if (fact.subliders.length > 1) return { status: false, error: "FullSubliders" };
      const updatedSubliders3 = [...fact.lider, targetName];
      const updatedOficers3 = fact.oficers.filter(oficer => oficer !== targetName)
      const updatedFaction = { ...fact, subliders: updatedSubliders3, oficers: updatedOficers3 };
      FactionDB.set(`${factionName}`, updatedFaction);
      return { status: true, error: null };
    }
    //Aciende a Lider
    if (!fact.subliders.includes(targetName)) return { status: false, error: "NotSublider" };
    const updatedSubliders = [...fact.subliders, playerName];
    fact.factionLider = targetName
    const updatedFaction = { ...fact, subliders: updatedSubliders };
    const updatedSubliders2 = updatedFaction.subliders.filter(sublider => sublider !== targetName)
    const updatedFaction2 = { ...fact, subliders: updatedSubliders2 };
    FactionDB.set(`${factionName}`, updatedFaction2);
    return { status: true, error: null };
  })
}

/**
 * Degrada a Miembro
 * @param {string} factionName 
 * @param {string} playerName 
 * @param {string} targetName 
 * @returns {{status: boolean, error: string | null}}
 */
Faction.demoteMember = async (factionName, playerName, targetName) => {
  return await functionQueue.enqueue(() => {
    const fact = FactionDB.get(`${factionName}`)
    if (!fact)
      return { status: false, error: "NotFound" };
    if (fact.factionLider !== playerName) {
      //Sublider Degrada Oficial a Miembro 
      if (fact.subliders.includes(playerName) && fact.oficers.include(targetName)) {
        const updatedOficers = fact.oficers.filter((invite) => invite !== targetName);
        const updatedMembers = [...fact.members, targetName]
        const updatedFaction = { ...fact, oficers: updatedOficers, members: updatedMembers };
        FactionDB.set(`${factionName}`, updatedFaction);
        return { status: true, error: null };
      }
      return { status: false, error: "PermissionError" };
    }
    if (fact.members.include(targetName)) return { status: false, error: "IsLowMember" };
    //Degrada Oficial a Miembro
    if (fact.oficers.include(targetName)) {
      const updatedOficers = fact.oficers.filter((oficer) => oficer !== targetName);
      const updatedMember = [...fact.members, targetName]
      const updatedFaction = { ...fact, oficers: updatedOficers, members: updatedMember };
      FactionDB.set(`${factionName}`, updatedFaction);
      return { status: true, error: null };
    }
    //Degrada Sublider a Oficial
    const updatedSubliders3 = fact.subliders.filter((sublider) => sublider !== targetName);
    const updatedOficers3 = [...fact.oficers, targetName]
    const updatedFaction = { ...fact, subliders: updatedSubliders3, oficers: updatedOficers3 };
    FactionDB.set(`${factionName}`, updatedFaction);
    return { status: true, error: null };
  })
}

/**
 * Check duplicate name
 * @param {string} name
 * @param {Player} player 
 * @returns {{sameName: boolean, factionLider: string | null}}
 */
Faction.checkDuplicate = (name) => {
  for (const [, existingFaction] of FactionDB.entries()) {
    const nameFaction = existingFaction.name;
    const sameName = name == nameFaction ? true : false
    if (sameName)
      return {
        sameName,
        factionLider: existingFaction.factionLider,
      };
  }
  return {
    sameName: false,
    factionLider: null,
  };
}

export default Faction
import { Entity, ScoreboardIdentity } from "@minecraft/server";
import Server from "../server";
import { Log } from "./Log";

/**
 * Obten el score grabado para un participante sobre un objeto
 * @param participant
 * @param objectiveId
 */
export function getScore(participant, objectiveId) {
    try {
        return Server.world.scoreboard.getObjective(objectiveId).getScore(participant);
    } catch (err) {
        return undefined
    }
}

/**
 * Establece el score grabado para un participante sobre un objeto
 * @param participant
 * @param objectiveId
 * @param score
 * @returns {ScoreboardIdentity} participante al que el fue cambiado en el objeto
 */
export function setScore(participant, objectiveId, score) {
    const objective = Server.world.scoreboard.getObjective(objectiveId);
    if (!objective)
        //throw new Error(`Objective ${objectiveId} no fue encontrado`)
        throw Log(`Objective ${objectiveId} no fue encontrado`)
    objective.setScore(participant, score);
    if (participant instanceof Entity)
        return participant.scoreboardIdentity;
    else if (participant instanceof ScoreboardIdentity)
        return participant
    else
        return objective.getParticipants().find(p => p.displayName === participant);
}

/**
 * Agrega el score grabado para entity sobre el objeto
 * @param participant
 * @param objectiveId
 * @param score
 * 
 */
export function addScore(participant, objectiveId, score) {
    const objective = Server.world.scoreboard.getObjective(objectiveId);
    if (!objective)
        throw Log(`Objective ${objectiveId} no fue encontrado`)
    objective.addScore(participant, score);
    if (participant instanceof Entity)
        return participant.scoreboardIdentity;
    else if (participant instanceof ScoreboardIdentity)
        return participant
    else
        return objective.getParticipants().find(p => p.displayName === participant);
}

export function checkObjective(objectiveId) {
    try {
      const objective = Server.world.scoreboard.getObjective(objectiveId);
      if (objective) return true
      return false
    } catch(err) {
      return false
    }
  }
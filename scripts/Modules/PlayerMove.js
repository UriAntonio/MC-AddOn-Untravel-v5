import { Entity } from "@minecraft/server";

const MathRound = (x) => {
  return Math.round(x * 1000) / 1000;
};

/**
 * Returns `true` if entity is movings
 * @param {Entity} entity 
 */
const isMoving = (entity) => {
  
  /**
   * @type {import("@minecraft/server").Vector3}
   */
  const vector = {
    x: MathRound(entity.getVelocity().x),
    y: MathRound(entity.getVelocity().y),
    z: MathRound(entity.getVelocity().z)
  };

  if (vector.x === 0 && vector.y === 0 && vector.z === 0) return false;
  else return true;
};

export default isMoving
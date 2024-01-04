import Land from "./Land";
import Setting from "./Setting";

const calculateCorner = (coordinate1, coordinate2) => {
    const { x: x1, z: z1 } = coordinate1;
    const { x: x2, z: z2 } = coordinate2;
  
    const corner1 = { x: x1, z: z1 };
    const corner2 = { x: x1, z: z2 };
    const corner3 = { x: x2, z: z2 };
    const corner4 = { x: x2, z: z1 };
  
    const corners = [corner1, corner2, corner3, corner4];
  
    return corners;
  }
  
  const ParticleLand = (start, end, dimension, y) => {
    calculateCorner(start, end).forEach(c => {
      try { dimension.spawnParticle(Setting.get("particleClaim"), { x: c.x + 0.5, y: y + 1.30, z: c.z + 0.5 }) } catch (err) { }
    })
    const center = Land.getCenter(start, end)
    try { dimension.spawnParticle(Setting.get("particleClaim"), { x: center.x + 0.5, y: y + 1.30, z: center.z + 0.5 }) } catch (err) { }
  }

  export default ParticleLand
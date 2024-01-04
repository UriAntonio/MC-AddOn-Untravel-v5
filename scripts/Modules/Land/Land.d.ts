declare interface LandSetting {
  building: boolean;
  breaking: boolean;
  openContainer: boolean;
  openDoor: boolean;
  pushButton: boolean;
  useLever: boolean;
  interactWithMobs: boolean;
}

declare interface LandStructure {
  landId: string;
  landOwner: string;
  landDimension: string;
  creationDate: string;
  landCenter: { x: number; z: number };
  land: {
    start: { x: number; z: number };
    end: { x: number; z: number }
  };
  invites: string[],
  setting: LandSetting
}

declare const Land: {
  createLand: (
    player: Player,
    start: { x: number; z: number },
    end: { x: number; z: number }
  ) => Promise<{ created: boolean; overlapInfo: { isInside: boolean; landOwner: string | null } | null }>;
  getCenter: (start: import("@minecraft/server").Vector3, end: import("@minecraft/server").Vector3) => { x: number; z: number };
  deleteLand: (landId: string, playerName: string) => Promise<{ deleted: boolean; error: string | null }>;
  getLands: (playerName: string) => LandStructure[];
  getAllLands: () => Record<string, LandStructure[]>;
  invitePlayer: (landId: string, playerName: string, targetName: string) => Promise<{ status: boolean; error: string | null }>;
  removeInvite: (landId: string, playerName: string, targetName: string) => Promise<{ status: boolean; error: string | null }>;
  transferOwnership: (landId: string, playerName: string, targetName: string) => Promise<{ status: boolean; error: string | null }>;
  checkOverlap: (
    start: import("@minecraft/server").Vector3,
    end: import("@minecraft/server").Vector3,
    player: Player
  ) => { isInside: boolean; landOwner: string | null };
  testLand: (
    position: import("@minecraft/server").Vector3,
    dimension: Dimension
  ) => { isInside: boolean; owner: string | null; invites: string[] | null; id: string | null; setting: LandSetting ;data: LandStructure | null };
  calculateLandSize: (start: import("@minecraft/server").Vector3, end: import("@minecraft/server").Vector3) => number;
}

export default Land
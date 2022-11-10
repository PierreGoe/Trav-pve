export interface Tiles {
  id: string;
  x: number;
  y: number;
  isVillage: boolean;
  isMyVillage: boolean;
  templateValley: templateValley;
}

export interface templateValley {
  [key: number]: ValleySlot;
}
export interface ValleySlot {
  id: number;
  type: string;
  level: number;
  townSlots?: TownSlots;
}

export interface TownSlots {
  [key: number]: Building;
}

export type ListBuilding = {
  [key: number]: Building;
};

type Building = {
  id: number;
  type: string | null;
  level: number | null;
  isEmpty: boolean;
};

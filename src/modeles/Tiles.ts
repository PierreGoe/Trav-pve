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
}

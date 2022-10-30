export interface Tiles {
  id: string;
  x: number;
  y: number;
  isVillage: boolean;
  isMyVillage: boolean;
  templateValley: templateValley;
}

interface templateValley {
  [key: string]: ValleySlot;
}
interface ValleySlot {
  id: number;
  type: string;
  level: number;
}

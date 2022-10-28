import type { Tiles } from "./Tiles";
export interface WorldMap {
  id: string;
  name: string;
  width: number;
  height: number;
  tiles: Tiles[];
}

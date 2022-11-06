export interface matrixBuildCost {
  [key: number]: Cost;
}
type Cost = {
  crops: number;
  wood: number;
  stone: number;
  gold: number;
};

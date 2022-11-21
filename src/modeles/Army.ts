export type ArmyPayload = {
  swordsmen: number;
  archers: number;
  pikemen: number;
  cavalry: number;
};

export type UnitArmy = {
  attack: number;
  defense: number;
  speed: number;
  icon: string;
  cost: Cost;
  foodcost: number;
};
export type Cost = {
  gold: number;
  wood: number;
  stone: number;
  crops: number;
};

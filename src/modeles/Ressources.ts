export interface Ressources {
  wood: Ressource;
  stone: Ressource;
  gold: Ressource;
  crops: Ressource;
}

interface Ressource {
  name: string;
  value: number;
  icon: string;
  color: string;
}

export interface Production {
  wood: number;
  stone: number;
  gold: number;
  crops: number;
}

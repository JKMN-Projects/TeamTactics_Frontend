import { Player } from "./player";

export interface Formation {
  goalkeeper: Player,
  defenders: Player[],
  midfielders: Player[],
  attackers: Player[]
}

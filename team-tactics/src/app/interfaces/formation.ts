import { TeamPlayer } from "./team-player";

export interface Formation {
  id: number;
  name: string;
  goalkeeper: number;
  defenderAmount: number;
  midfielderAmount: number;
  attackerAmount: number;
}

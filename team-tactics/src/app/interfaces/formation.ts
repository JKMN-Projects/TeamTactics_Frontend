import { TeamPlayer } from "./team-player";

export interface Formation {
  name: string;
  goalkeeperAmount: number;
  goalkeeper: TeamPlayer;
  defenderAmount: number;
  defenders: TeamPlayer[];
  midfielderAmount: number;
  midfielders: TeamPlayer[];
  attackerAmount: number;
  attackers: TeamPlayer[];
}

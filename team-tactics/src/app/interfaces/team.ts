import { Formation } from "./formation";
import { TeamPlayer } from "./team-player";

export interface Team {
  id: number;
  name: string;
  status: number;
  isLocked: boolean;
  formation: string;
  players: TeamPlayer[];
}

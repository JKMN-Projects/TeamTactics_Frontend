import { Formation } from "./formation";
import { TeamPlayer } from "./team-player";

export interface Team {
  id: number;
  name: string;
  locked: boolean;
  formation: Formation;
  players: TeamPlayer[];
}

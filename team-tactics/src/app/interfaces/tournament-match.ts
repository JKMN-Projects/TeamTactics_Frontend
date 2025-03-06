export interface TournamentMatch {
  id: number;
  homeClubScore: number;
  awayClubScore: number;
  timestamp: Date;
  homeClubId: number;
  awayClubId: number;
  competitionId: number;
}

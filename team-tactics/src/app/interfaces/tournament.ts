export interface Tournament {
  id: number;
  name: string;
  description: string;
  inviteCode?: string;
  userId: number;
  competitionId: number;
}

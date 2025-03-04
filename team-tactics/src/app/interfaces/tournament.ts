export interface Tournament {
  id: number;
  name: string;
  description: string;
  inviteCode?: string;
  userId: number;
  adminUsername: string;
  competitionId: number;
  competitionName: string;
}

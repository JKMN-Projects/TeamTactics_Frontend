export interface Tournament {
  id: number;
  name: string;
  description: string;
  inviteCode?: string;
  ownerUserId: number;
  ownerUsername: string;
  competitionId: number;
  competitionName: string;
}

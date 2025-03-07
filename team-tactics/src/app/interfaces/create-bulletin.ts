export interface CreateBulletin {
  id: number;
  text: string;
  createdTime: number;
  lastEditedTime: number;
  tournamentId: number;
  userId: number;
}

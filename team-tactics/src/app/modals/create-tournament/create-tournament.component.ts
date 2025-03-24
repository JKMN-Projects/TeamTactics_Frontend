import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateTournament } from '../../interfaces/create-tournament';
import { TournamentService } from '../../services/tournament.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './create-tournament.component.html',
  styleUrl: './create-tournament.component.css'
})
export class CreateTournamentComponent {
  tournamentForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { competitionId: number, userId: number }, private fb: FormBuilder,
  private tournamentService: TournamentService, private matDialogRef: MatDialogRef<CreateTournamentComponent>) {
    this.tournamentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(500)]],
      teamName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  onSubmit() {
    let tournament = {
      name: this.tournamentForm.get("name")?.value,
      description: this.tournamentForm.get("description")?.value,
      teamName: this.tournamentForm.get("teamName")?.value,
      competitionId: this.data.competitionId,
    } as CreateTournament;

    this.tournamentService.createTournament(tournament);

    this.matDialogRef.close(true);
  }
}

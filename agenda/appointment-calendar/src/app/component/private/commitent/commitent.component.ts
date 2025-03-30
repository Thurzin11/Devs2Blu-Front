import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ICommitment } from '../../../interface/interface';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commitent',
  templateUrl: './commitent.component.html',
  styleUrl: './commitent.component.scss'
})
export class CommitentComponent {
  commitments: ICommitment[] = [];
  isLoading = true;
  errorMessage = '';
  private api = inject(ApiService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.loadCommitments();
  }

  private loadCommitments(): void {
    if (this.authService.getUserRole() !== 'admin') {
      this.api.getAllCommitentsByUser(this.authService.getUserId()).subscribe(
        (data: ICommitment[]) => {
          this.commitments = data;
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = 'Failed to load commitments';
          this.isLoading = false;
        }
      );
      return;
    }
    this.api.getAllCommitents().subscribe(
      (data: ICommitment[]) => {
        this.commitments = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load commitments';
        this.isLoading = false;
      }
    );
  }

  navigateToEdit(commitmentId: string): void {
    this.router.navigate([`/edit-commitment/${commitmentId}`]);
  }
  editCommitment(commitent: ICommitment){
    this.navigateToEdit(commitent.id);
  }

  deleteCommitment(commitmentId: string): void {
    if (confirm('Tem certeza que deseja excluir este compromisso?')) {
      this.api.deleteCommitent(commitmentId).subscribe(
        () => {
          this.loadCommitments();
        },
        (error) => {
          alert('Erro ao excluir o compromisso.');
        }
      );
    }
  }
}

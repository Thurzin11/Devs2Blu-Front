import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ICommitment } from '../../../interface/interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-commitent-form',
  templateUrl: './commitent-form.component.html',
  styleUrl: './commitent-form.component.scss'
})
export class CommitentFormComponent implements OnInit {
  commitment: ICommitment = {
    id: '',
    title: '',
    description: '',
    date: '',
    time: '',
    contactId: '',
    localId: '',
    userId: ''
  };
  isEditMode = false;
  commitmentId: string | null = null;
  api = inject(ApiService)

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.commitmentId = id;
      this.api.getCommitment(this.commitmentId).subscribe((commitment) => {
        this.commitment = commitment;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.commitmentId) {
      this.api.updateCommitment(this.commitmentId, this.commitment).subscribe(() => {
        this.router.navigate(['/commitent']);
      });
    } else {
      this.commitment.id = uuidv4();
      this.commitment.userId = localStorage.getItem('userId') || '';
      this.api.addCommitment(this.commitment).subscribe(() => {
        this.router.navigate(['/commitent']);
      });
    }
  }
}

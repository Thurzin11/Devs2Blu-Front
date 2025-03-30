import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IContact } from '../../../interface/interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contacts: IContact[] = [];
  isLoading = true;
  errorMessage = '';
  displayedColumns: string[] = ['name', 'email', 'actions'];
  private api = inject(ApiService);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.loadContacts();
  }

  private loadContacts(): void {
    if(this.authService.getUserRole() !== 'admin'){
      this.api.getAllContactsByUser(this.authService.getUserId()).subscribe(
        (data: IContact[]) => {
          this.contacts = data;
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = 'Falha ao carregar contatos';
          this.isLoading = false;
        }
      );
      return;
    }
    this.api.getAllContacts().subscribe(
      (data: IContact[]) => {
        this.contacts = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Falha ao carregar contatos';
        this.isLoading = false;
      }
    );
  }
  navigateToEdit(contact: string): void {
    this.router.navigate([`/edit-contact/${contact}`]);
  }

  editContact(contact: IContact) {
    this.navigateToEdit(contact.id);
  }

  deleteContact(id: string) {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
      this.api.deleteContact(id).subscribe(
        () => {
          this.loadContacts();
        },
        (error) => {
          alert('Erro ao excluir o contact.');
        }
      );
    }
  }
}

import { Component, inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { IContact } from '../../../interface/interface';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  contact: IContact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    userId: ''
  };

  isEditMode = false;
  contactId: string | null = null;
  api = inject(ApiService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.contactId = id;
      this.api.getContact(this.contactId).subscribe((contact) => {
        this.contact = contact;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.contactId) {
      this.api.updateContact(this.contactId, this.contact).subscribe(() => {
        this.router.navigate(['/contact']);
      });
    } else {
      this.contact.id = uuidv4();
      this.api.addContact(this.contact).subscribe(() => {
        this.router.navigate(['/contact']);
      });
    }
  }
}

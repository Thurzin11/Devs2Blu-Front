import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ILocation } from '../../../interface/interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.scss'
})
export class LocationFormComponent implements OnInit {
  location: ILocation = {
    id: '',
    name: '',
    address: ''
  };

  isEditMode = false;
  locationId: string | null = null;
  api = inject(ApiService);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.locationId = id;
      this.api.getAllLocations().subscribe(locations => {
        const foundLocation = locations.find(l => l.id === id);
        if (foundLocation) {
          this.location = foundLocation;
        } else {
          this.router.navigate(['/location']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.locationId) {
      this.api.updateLocation(this.location).subscribe(() => {
        this.router.navigate(['/location']);
      });
    } else {
      this.location.id = uuidv4();
      this.api.createLocation(this.location).subscribe(() => {
        this.router.navigate(['/location']);
      });
    }
  }
}

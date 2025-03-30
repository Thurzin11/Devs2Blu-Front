import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ILocation } from '../../../interface/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  locations: ILocation[] = [];
  isLoading = true;
  errorMessage = '';
  api = inject(ApiService);
  router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.loadLocations();
  }

  private loadLocations(): void {
    this.api.getAllLocations().subscribe(
      (data: ILocation[]) => {
        this.locations = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load locations';
        this.isLoading = false;
      }
    );
  }
  createLocation(location: ILocation): void {
    this.api.createLocation(location).subscribe(
      () => {
        this.loadLocations();
      },
      (error) => {
        this.errorMessage = 'Failed to create location';
      });
  }
  updateLocation(location: ILocation): void {
    this.router.navigate([`/edit-location/${location.id}`]);
  }

  deleteLocation(location: ILocation): void {
    if(location.id === undefined) {
      this.errorMessage = 'Location id is undefined';
      return;
    }
    this.api.deleteLocation(location.id).subscribe(
      () => {
        this.loadLocations();
      },
      (error) => {
        this.errorMessage = 'Failed to delete location';
      }
    );
  }
}

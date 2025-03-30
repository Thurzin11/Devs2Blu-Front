import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICommitment, IContact, ILocation } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  readonly urlApi: string = 'http://localhost:3000';

  constructor() { }

  getCommitment(id: string){
    return this.http.get<ICommitment>(`${this.urlApi}/commitents/${id}`);
  }
  updateCommitment(id: string, commitment: ICommitment){
    return this.http.put<ICommitment>(`${this.urlApi}/commitents/${id}`, commitment);
  }
  addCommitment(commitent: ICommitment){
    return this.http.post<ICommitment>(`${this.urlApi}/commitents`,commitent);
  }
  deleteCommitent(id: string){
    return this.http.delete<ICommitment>(`${this.urlApi}/commitents/${id}`)
  }

  getAllCommitents(): Observable<ICommitment[]> {
    return this.http.get<ICommitment[]>(`${this.urlApi}/commitents`);
  }
  getAllCommitentsByUser(userId: string): Observable<ICommitment[]> {
    return this.http.get<ICommitment[]>(`${this.urlApi}/commitents`).pipe(
      map((commitents: ICommitment[]) => commitents.filter((commitent: ICommitment) => commitent.userId === userId))
    );
  }

  getAllContactsByUser(userId: string): Observable<IContact[]> {
    return this.http.get<IContact[]>(`${this.urlApi}/contacts`).pipe(
      map((contacts: IContact[]) => contacts.filter((contact: IContact) => contact.userId === userId))
    );
  }
  getAllContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(`${this.urlApi}/contacts`);
  }
  getContact(id: string): Observable<IContact> {
    return this.http.get<IContact>(`${this.urlApi}/contacts/${id}`);
  }
  addContact(contact: IContact): Observable<IContact> {
    return this.http.post<IContact>(`${this.urlApi}/contacts`, contact);
  }
  deleteContact(id: string): Observable<IContact> {
    return this.http.delete<IContact>(`${this.urlApi}/contacts/${id}`);
  }
  updateContact(id: string, contact: IContact){
    return this.http.put<IContact>(`${this.urlApi}/contacts/${id}`, contact);
  }

  getAllLocations(): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(`${this.urlApi}/locations`);
  }
  createLocation(location: ILocation): Observable<ILocation> {
    return this.http.post<ILocation>(`${this.urlApi}/locations`, location);
  }
  updateLocation(location: ILocation): Observable<ILocation> {
    return this.http.put<ILocation>(`${this.urlApi}/locations/${location.id}`, location);
  }
  deleteLocation(id: string): Observable<ILocation> {
    return this.http.delete<ILocation>(`${this.urlApi}/locations/${id}`);
  }
}

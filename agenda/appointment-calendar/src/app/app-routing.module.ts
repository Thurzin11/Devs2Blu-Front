import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { CadastroComponent } from './component/cadastro/cadastro.component';
import { CommitentComponent } from './component/private/commitent/commitent.component';
import { Autorizado } from './guards/autorizado.guard';
import { ContactComponent } from './component/private/contact/contact.component';
import { LocationComponent } from './component/private/location/location.component';
import { locationGuard } from './guards/location.guard';
import { CommitentFormComponent } from './component/private/commitent-form/commitent-form.component';
import { ContactFormComponent } from './component/private/contact-form/contact-form.component';
import { LocationFormComponent } from './component/private/location-form/location-form.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: CadastroComponent },
  {
    path: 'commitent',
    component: CommitentComponent,
    canActivate: [Autorizado],
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [Autorizado],
  },
  {
    path: 'location',
    component: LocationComponent,
    canActivate: [Autorizado, locationGuard],
  },
  {
    path: 'add-location',
    component: LocationFormComponent,
    canActivate: [Autorizado, locationGuard],
  },
  {
    path: 'edit-location/:id',
    component: LocationFormComponent,
    canActivate: [Autorizado, locationGuard],
  },
  {
    path: 'add-commitment',
    component: CommitentFormComponent,
    canActivate: [Autorizado],
  },
  {
    path: 'edit-commitment/:id',
    component: CommitentFormComponent,
    canActivate: [Autorizado],
  },
  {
    path: 'add-contact',
    component: ContactFormComponent,
    canActivate: [Autorizado],
  },
  {
    path: 'edit-contact/:id',
    component: ContactFormComponent,
    canActivate: [Autorizado],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

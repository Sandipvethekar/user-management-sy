import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'user-form', component: UserAddEditComponent },
  { path: 'user-form/:i', component: UserAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

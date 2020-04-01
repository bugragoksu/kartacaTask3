import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomepageComponent ,canActivate:[AuthGuardService] },
  { path: 'detail/:id', component: DetailComponent  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


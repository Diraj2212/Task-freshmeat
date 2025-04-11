import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
   loadChildren: () => import('./component/login/login.module').then(m => m.LoginModule) },
  { path: 'signin', 
  loadChildren: () => import('./component/signin/signin.module').then(m => m.SigninModule) },
  {
    path:'admin',
    loadChildren:()=>import('./modules/admin/retailer.module').then(m=>m.AdminModule)
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

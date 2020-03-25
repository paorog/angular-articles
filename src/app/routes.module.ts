import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ArticleListComponent } from './articles/list/list.component';
import { UserListComponent } from './users/list/list.component';

const routes: Routes = [

  {path: '', redirectTo: '/articles', pathMatch: 'full'},
  {path: 'articles', component: ArticleListComponent, pathMatch: 'full'},
  {path: 'users', component: UserListComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutesModule {
}

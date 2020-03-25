import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArticleListComponent } from './articles/list/list.component';
import { UserListComponent } from './users/list/list.component';
import { RoutesModule } from './routes.module';

import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from './articles/article.service';
import { UserService } from './users/user.service';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ArticleService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

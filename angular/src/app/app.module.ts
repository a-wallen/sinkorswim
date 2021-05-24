import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
//import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { APP_BASE_HREF } from "@angular/common";
import { routing } from "./app.routing";

//Added this
import { MemeComponent } from "./meme/meme.component";
import { MemeService } from "app/meme.service";
import { FeedComponent } from './feed/feed.component';
import { MemeListItemComponent } from './meme-list-item/meme-list-item.component';
import { Comment1Component } from './comment1/comment1.component';
import { UserService } from "./user.service";
import { CommentService } from "./comment.service";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MemeComponent,
    FeedComponent,
    MemeListItemComponent,
    Comment1Component,
  ],
  imports: [BrowserModule, FormsModule, HttpModule, routing],

  //Aded meme service to the end of this
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    MemeService,
    UserService,
    CommentService
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

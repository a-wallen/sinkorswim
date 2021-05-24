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
import { MemeService } from "app/meme-service.service";
import { FeedComponent } from "./feed/feed.component";
import { MemeListItemComponent } from "./meme-list-item/meme-list-item.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,

    MemeComponent,
    FeedComponent,
    MemeListItemComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpModule, routing],

  //Aded meme service to the end of this
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }, MemeService],

  bootstrap: [AppComponent],
})
export class AppModule {}

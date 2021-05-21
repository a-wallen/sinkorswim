import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
//import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ListsComponent } from "./lists/lists.component";
import { APP_BASE_HREF } from "@angular/common";
import { routing } from "./app.routing";
import { ListComponent } from "./list/list.component";
import { ListsService } from "app/list-service.service";
import { ListsTableComponent } from "./lists/lists-table/lists-table.component";
import { ItemsTableComponent } from "./list/items-table/items-table.component";

//Added this
import { MemeComponent } from "./meme/meme.component";
import { MemeService } from "app/meme-service.service";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ListsComponent,
    ListComponent,
    ListsTableComponent,
    ItemsTableComponent,
    MemeComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpModule, routing],

  //Aded meme service to the end of this
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    ListsService,
    MemeService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

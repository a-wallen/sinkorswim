import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ListsComponent } from "./lists/lists.component";
import { ListComponent } from "./list/list.component";

//Added this
import { MemeComponent } from "./meme/meme.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "list", component: ListsComponent },
  { path: "list/:id", component: ListComponent },
  { path: "meme/:memeId", component: MemeComponent },
];

export const routing = RouterModule.forRoot(routes);

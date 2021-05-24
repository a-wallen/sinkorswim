import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";

//Added this
import { MemeComponent } from "./meme/meme.component";
import { FeedComponent } from "./feed/feed.component";

const routes: Routes = [
  { path: "", component: FeedComponent },
  { path: "meme/:memeId", component: MemeComponent },
];

export const routing = RouterModule.forRoot(routes);

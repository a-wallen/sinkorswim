import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

// import { ListsService } from "../list-service.service";
// import ITaskModelAngular from "../share/ITaskModelAngular";
// import IListModelAngular from "../share/IListModelAngular";
// import Item from "../share/Item";

// //Added these
// import IMemeModelAngular from "../share/IMemeModelAngular";
// import { MemeService } from "../meme-service.service";

@Component({
  // moduleId: module.id,
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  userId: string;

  constructor() { }
  // constructor(
  //   private route: ActivatedRoute,
  //   private location: Location,
  //   private meme$: MemeService
  // ) {
  //   this.memeId = route.snapshot.params["memeId"];

  //   meme$
  //     .getMemeDetails(this.memeId) //change this
  //     .subscribe(
  //       (result) => {
  //         this.userId = result.userId;
  //         this.caption = result.caption;
  //         this.totalVotes = result.totalVotes;
  //         this.imageUrl = result.imageUrl;
  //       },
  //       () => {},
  //       () => {}
  //     );
  // }

  ngOnInit(): void {}

}

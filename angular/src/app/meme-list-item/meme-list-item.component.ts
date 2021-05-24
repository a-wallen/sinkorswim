import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

// import { ListsService } from "../list-service.service";
// import ITaskModelAngular from "../share/ITaskModelAngular";
// import IListModelAngular from "../share/IListModelAngular";
// import Item from "../share/Item";

//Added these
import IMemeModelAngular from "../share/IMemeModelAngular";
import { MemeService } from "../meme.service";

@Component({
  // moduleId: module.id,
  selector: 'app-meme-list-item',
  templateUrl: './meme-list-item.component.html',
  styleUrls: ['./meme-list-item.component.css']
})
export class MemeListItemComponent implements OnInit {
  memeId: string;
  userId: string;
  caption: string;
  totalVotes: Number;
  imageUrl: String;
  timePost: Date;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private meme$: MemeService
  ) {
    this.memeId = route.snapshot.params["memeId"];
  }

  ngOnInit(): void {
    this.meme$
      .getMemeDetails(this.memeId) //change this
      .subscribe(
        (result) => {
          this.userId = result.userId;
          this.caption = result.caption;
          this.totalVotes = result.totalVotes;
          this.imageUrl = result.imageUrl;
        },
        () => {},
        () => {}
      );
  }

}

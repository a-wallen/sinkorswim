import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { ListsService } from "../list-service.service";
import ITaskModelAngular from "../share/ITaskModelAngular";
import IListModelAngular from "../share/IListModelAngular";
import Item from "../share/Item";

//Added these
import IMemeModelAngular from "../share/IMemeModelAngular";
import { MemeService } from "../meme-service.service";

@Component({
  moduleId: module.id,
  selector: "app-meme",
  templateUrl: "./meme.component.html",
  styleUrls: ["./meme.component.css"],
})
export class MemeComponent implements OnInit {
  memeId: string;
  userId: string;
  caption: string;
  totalVotes: Number;
  imageUrl: String;
  timePost: Date;

  userName: string; 
  //not sure what else we need, if any

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private meme$: MemeService
  ) {
    this.memeId = route.snapshot.params["memeId"];

    meme$
      .getMemeDetails(this.memeId) //change this
      .subscribe(
        (result) => {
          // console.log(result);
          //console.log("in component");
          this.userId = result[0].userId;
          this.caption = result[0].caption;
          this.totalVotes = result[0].totalVotes;
          this.imageUrl = result[0].imageUrl;
        },
        () => {},
        () => {}
      );
    meme$
        .getUserInfo("101594") // const for userId 
        .subscribe(
          (result1) => {
            // console.log("username for userid of :" + this.userId); 
            console.log(result1); 
            console.log("Get userinfo from a meme"); 
            console.log(result1); 
          },
          () => {},
          () => {}
        );
  }

  ngOnInit(): void {}
}
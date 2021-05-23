import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

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
    var result2 = meme$.getUserInfo(this.memeId);

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
        }
      );
    meme$
      .getUserInfo("42069") // const for userId
      .subscribe(
        (result) => {
          console.log(result);
          console.log(result.userName);
          this.userName = result.userName; 
        }
      );
  }

  ngOnInit(): void {}
}

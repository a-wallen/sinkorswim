import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

//Added these
import IMemeModelAngular from "../share/IMemeModelAngular";
import { MemeService } from "../meme.service";

@Component({
  moduleId: module.id,
  selector: "app-meme",
  templateUrl: "./meme.component.html",
  styleUrls: ["./meme.component.css"],
})
export class MemeComponent implements OnInit {
  userId: string;
  caption: string;
  totalVotes: Number;
  imageUrl: String;
  timePost: Date;
  memeModel: IMemeModelAngular;
  result: any;
  userName: string;
  //not sure what else we need, if any

  @Input()
  memeId: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private meme$: MemeService
  ) {
    // this.memeId = route.snapshot.params["memeId"]
    // var result2 = meme$.getUserInfo(this.memeId);
    // meme$
    //   .getUserInfo("42069") // const for userId
    //   .subscribe((result) => {
    //     this.userName = result.userName;
    //   });
    //Get Comments here as well
  }
  upvoteMethod() {
    this.meme$.upvote(this.memeId);
  }

  downvoteMethod() {
    this.meme$.downvote(this.memeId);
  }

  reportMethod() {
    this.meme$.report(this.memeId);
  }

  ngOnInit(): void {
    this.meme$
      .getMemeDetails(this.memeId) //change this
      .subscribe((data) => {
        console.log(data);
      });
  }
}

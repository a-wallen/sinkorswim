import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { Optional } from "@angular/core";

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
  public memeId: string;
  userId: string;
  caption: string;
  totalVotes: Number;
  imageUrl: String;
  timePost: Date;
  memeModel: IMemeModelAngular;

  userName: string;
  //not sure what else we need, if any

  @Input()
  htmlmeme: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private meme$: MemeService
  ) {
    this.memeId = route.snapshot.params["memeId"];
    console.log(this.htmlmeme);
    meme$
      .getMemeDetails("4000") //change this
      .subscribe((result) => {
        this.memeModel = result[0];
        //console.log(this.htmlmeme);
        // console.log(result);
        //console.log("in component");
        this.userId = result[0].userId;
        this.caption = result[0].caption;
        this.totalVotes = result[0].totalVotes;
        this.imageUrl = result[0].imageUrl;
      });

    //
    // meme$
    //   .getUserInfo("42069") // const for userId
    //   .subscribe((result) => {
    //     //console.log(result);
    //     //console.log(result.userName);
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
  ngOnInit(): void {}
}

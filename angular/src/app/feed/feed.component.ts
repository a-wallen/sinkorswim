import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

// //Added these
import IMemeModelAngular from "../share/IMemeModelAngular";
import { MemeService } from "../meme-service.service";

@Component({
  // moduleId: module.id,
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  userId: string;
  memes: IMemeModelAngular[];
  day: String;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private meme$: MemeService,

  ) {
    this.day = "2021-05-02T23:03:18.254+00:00" //change to current date later
    meme$
      .getFeed(this.day) //change this

      .subscribe(
        (result) => {
          // put JSON objects into Meme model array
          this.memes = result;

          console.log(this.memes);
        },
        () => {},
        () => {}
      );

  }

  ngOnInit(): void {
  }

}

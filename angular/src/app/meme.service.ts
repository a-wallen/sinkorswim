import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class MemeService {

  constructor(private http: Http) {}

  getMemeDetails(memeId: string) {
    //IS THIS ROUTE CORRECT? ==============================================================================
    return this.http
      .get("http://localhost:8080/app/memes/" + memeId)
      .map((response) => response.json());
  }

  // getUserInfo(userId: string) {
  //   //console.log("Gets username for a meme");
  //   //console.log(userId);
  //   return this.http
  //     .get("http://localhost:8080/app/users/" + userId)
  //     .map((response) => response.json());
  // }

  //I DONT KNOW HOW TO PASS IN A JSON FOR THIS ROUTE
  // getComments(memeId: String) {
  //   return this.http
  //     .get("http://localhost:8080/app/memes/comment/")
  //     .map((response) => response.json());
  // }

  upvote(memeId: String) {
    console.log("Upvote is called with memeID :" + memeId);
  }

  downvote(memeId: String) {
    console.log("downvote is called with memeID :" + memeId);
  }

  report(memeId: String) {
    console.log("report is called with memeID :" + memeId);
  }

  getFeed(datetime: String) {
    return (
      this.http
        .get("http://localhost:8080/app/memes/day/" + datetime)
        //    return this.http.get( '/app/list/' + index)
        .map((response) => response.json())
    );
  }

}

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class CommentService {

  constructor(private http: Http) { }

  fetchComments(memeId: string) {
    return this.http
      .get("http://localhost:8080/app/memes/comments/" + memeId)
      .map((response) => response.json());
  }
}


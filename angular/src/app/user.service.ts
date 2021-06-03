import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  fetchUser(userId: string) {
    console.log("/app/users/" + userId);
    return this.http
      .get("/app/users/" + userId)
      .map((response) => response.json());
  }
}


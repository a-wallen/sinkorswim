import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  fetchUser(userId: string) {
    return this.http
      .get("http://localhost:8080/app/users/" + userId)
      .map((response) => response.json());
  }
}

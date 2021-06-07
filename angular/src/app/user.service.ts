import { Injectable } from "@angular/core";
import { controlNameBinding } from "@angular/forms/src/directives/reactive_directives/form_control_name";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  fetchUser(userId: string) {
    console.log("/app/users/" + userId);
    return this.http
      .get("/app/users/" + userId)
      .map((response) => response.json());
  }

  getDisplayName() {
    console.log("Get display name gets called in user service angular\n");
    return this.http.get("/app/getUserSSO/").map((response) => response.json());
  }
}

//do I need to add routes to the sso stuff here?

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ListsService {
  constructor(private http: Http) {}

  getListsIndex() {
    console.log("enters getListsIndex in list-service.service.ts");
    return (
      this.http
        .get("http://localhost:8080/json/lists.json")
        //    return this.http.get( '/app/list/')
        .map((response) => response.json())
    );
  }

  getItems(index: string) {
    return (
      this.http
        .get("http://localhost:8080/json/lists/" + index + ".json")
        //    return this.http.get( '/app/list/' + index)
        .map((response) => response.json())
    );
  }
}

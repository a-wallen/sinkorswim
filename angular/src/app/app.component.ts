import { Component, OnInit } from "@angular/core";
import { UserService } from "app/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private user$: UserService) {}

  userId: string;
  title = "app works!";
  ngOnInit(): void {
    this.userId = this.user$.getDisplayName().toString();
    console.log(
      "Console Log of App.component" +
        JSON.stringify(this.user$.getDisplayName())
    );
  }
}

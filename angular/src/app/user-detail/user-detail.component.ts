import { Component, Input, OnInit } from '@angular/core';
import IUserModelAngular from 'app/share/IUserModelAngular';
import { UserService } from 'app/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userObject: IUserModelAngular;
  userId: string;
  userName: string;
  avatar_url: string;

  constructor(
    private user$ : UserService,
    private route: ActivatedRoute
  ) { 
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params["userId"];
    this.user$.fetchUser(this.userId).subscribe((result) => {
      console.log(result);
    },
    () => {},
    () => {})
  }

}

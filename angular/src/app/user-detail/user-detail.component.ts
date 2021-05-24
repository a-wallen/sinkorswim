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
  userName: string;
  avatar_url: string;

  @Input() userId: string;

  constructor(
    private user$ : UserService,
    private route: ActivatedRoute
  ) { 
  }

  ngOnInit() {
    this.user$
      .fetchUser(this.userId)
      .subscribe((response) => {
        if(response == null) return;
        this.userObject = response[0] as IUserModelAngular;
        this.userName = this.userObject.userName;
        this.avatar_url = this.userObject.avatar_url;
        console.log(response);
      },
      () => {},
      () => {},
      );
  }

}

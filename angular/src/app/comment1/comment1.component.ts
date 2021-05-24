import { Component, OnInit } from '@angular/core';
import { CommentService } from 'app/comment.service';
import { UserService } from 'app/user.service'
import  ICommentModelAngular from "../share/ICommentModelAngular";
import  IUserModelAngular  from "../share/IUserModelAngular";

@Component({
  selector: 'feed-comment',
  templateUrl: './comment1.component.html',
  styleUrls: ['./../meme-list-item/meme-list-item.component.css'],
})
export class Comment1Component implements OnInit {
  commentObj: ICommentModelAngular;
  userObj: IUserModelAngular;
  constructor(
    private memeId:string, 
    private comment$: CommentService,
    private user$: UserService,
    ) { 
    // fetch comment object
    comment$.fetchComments(memeId).subscribe((jsonResult) => {
      this.commentObj.commentId = jsonResult.commentId;
      this.commentObj.content = jsonResult.content;
      this.memeId = jsonResult.memeId;
      this.commentObj.userId = jsonResult.userId;
    },
    () => {},
    () => {},
    );
    
    // fetch the user profile of the user that made the comment
    // user$.fetchUser(this.commentObj.userId).subscribe((jsonResult) => {
    //   if(jsonResult == null) return;
    //   this.userObj = jsonResult as IUserModelAngular;
    //   this.userObj.avatar_url = jsonResult.avatar_url;
    // },
    // () => {},
    // () => {},
    // );
  }

  ngOnInit() {
  }

}

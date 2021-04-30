// post id/user id 
// comment id int
// likes int
// content string
// timestamp Date
// report(reporting user int)

class PostComment {
    user_id: number;
    post_id: number;
    comment_id: number;
    content: string;
    likes: number;
    timestamp: Date;

    constructor(content: string){
        this.content = content;
        this.timestamp = new Date();
        // TODO initialize comment_id
    }
}
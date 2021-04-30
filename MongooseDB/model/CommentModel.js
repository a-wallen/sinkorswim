// post id/user id 
// comment id int
// likes int
// content string
// timestamp Date
// report(reporting user int)
var PostComment = /** @class */ (function () {
    function PostComment(content) {
        this.content = content;
        this.timestamp = new Date();
        // TODO initialize comment_id
    }
    return PostComment;
}());

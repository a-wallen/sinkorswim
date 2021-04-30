// username - string
// user_id = int
// email string
// total upvotes int
// world rank int
// swimming posts int - are these just counts or are they meant to refer to posts?
// sinking posts int
// recent upvotes int[10]- is this an array of post_ids?
// report(reporting user int)
// validate(username string, password string)
// do we need a password field?
// how to initialize world_rank?
var User = /** @class */ (function () {
    function User(username, email) {
        this.username = username;
        this.email = email;
        this.swimming_posts = 0;
        this.sinking_posts = 0;
        // TODO initialize user_id and world_rank
    }
    return User;
}());

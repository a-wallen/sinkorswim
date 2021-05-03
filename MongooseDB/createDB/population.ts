const fake = require("faker");
import { UserModel } from '../model/UserModel';
import { PostModel } from '../model/PostModel';
import { CommentModel } from '../model/CommentModel';

let random = {
	userId: fake.datatype.number(),
    userName: fake.random.word(),
    email: fake.random.word(),
    password: fake.random.word(),
    total_upvotes: fake.datatype.number(),
    swimmingPosts: fake.datatype.number(),
    sinkingPosts: fake.datatype.number(),
    reports: fake.datatype.number()
}; 

class SOSDataGenerator {
	public Users: UserModel;
	public Posts: PostModel;
	public Comments: CommentModel;
	constructor() {
		this.Users = new UserModel();
		this.Posts = new PostModel();
		this.Comments = new CommentModel();
	}
}; 

let Generator = new SOSDataGenerator();
Generator.Users.model.create(random, (err) => {
	if (err) { console.log(err); }
});
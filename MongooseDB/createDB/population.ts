const fake = require("faker");
import { UserModel } from '../model/UserModel';
import { PostModel } from '../model/PostModel';
import { CommentModel } from '../model/CommentModel';
import { CLIENT_RENEG_LIMIT } from 'tls';

const GENERATOR_THRESHOLD = 0;

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

class SOSRemoteCollections {
	public Users: UserModel;
	public Posts: PostModel;
	public Comments: CommentModel;
	constructor() {
		this.Users = new UserModel();
		this.Posts = new PostModel();
		this.Comments = new CommentModel();
	}
}; 

class SOSDocumentGenerator {
	public makeUser() {
		let firstName = fake.name.firstName();
		let lastName = fake.name.lastName();
		return {
			userId: fake.random.uuid(),
			userName: firstName+fake.random.word()+lastName+fake.datatype.number(),
			email: lastName+firstName+'@gmail.com',
			password: fake.random.word()+fake.datatype.number(),
			total_upvotes: fake.datatype.number(),
			swimmingPosts: fake.datatype.number(),
			sinkingPosts: fake.datatype.number(),
			reports: fake.datatype.number(),
		};
	}

	public makePost() {
		return {
			postId: fake.random.uuid(),
			userId: fake.random.uuid(),
			feedId: fake.random.uuid(),
			totalVotes: fake.datatype.number(),
			caption: fake.random.words(10),
			timePost: fake.date.recent(),
			imageUrl: fake.random.words(6),// FIXME: how to format
			reports: fake.datatype.number(),
		};
	}

	public makeComment() {
		return {
			postId: fake.random.uuid(),
			userId: fake.random.uuid(),
			commentId: fake.datatype.number(),
			content: fake.random.words(10),
			likes: fake.datatype.number(),
			timestamp: fake.date.recent(),
		}
	}
}


let RemoteCollectionsInstance = new SOSRemoteCollections();
let Generator = new SOSDocumentGenerator();

// generate random users
for(let i:number = 0; i < GENERATOR_THRESHOLD; i++){
	RemoteCollectionsInstance.Users.model.create(Generator.makeUser(), (err) => {
		if (err) { console.log(err); }
	});
}

// generate random posts
for(let i:number = 0; i < GENERATOR_THRESHOLD; i++){
	RemoteCollectionsInstance.Posts.model.create(Generator.makePost(), (err) => {
		if (err) { console.log(err); }
	});
}

// generate random comments
for(let i:number = 0; i < GENERATOR_THRESHOLD; i++){
	RemoteCollectionsInstance.Comments.model.create(Generator.makeComment(), (err) => {
		if (err) { console.log(err); }
	});
}
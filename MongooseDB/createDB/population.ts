const fake = require("faker");
import { UserModel } from '../model/UserModel';
import { PostModel } from '../model/PostModel';
import { CommentModel } from '../model/CommentModel';

enum SOSCollections {
	Users,
	Posts,
	Comments,
}

class SOSRemoteCollectionInstance {
	public Users: UserModel;
	public Posts: PostModel;
	public Comments: CommentModel;
	public RemoteCollectionGroup;
	constructor() {
		this.Users = new UserModel();
		this.Posts = new PostModel();
		this.Comments = new CommentModel();
		this.RemoteCollectionGroup = [this.Users, this.Posts, this.Comments];
	}
}; 

class SOSDocumentGenerator {
	private remotecollection: SOSRemoteCollectionInstance;
	private collectionGeneratorFunctions: Array<Function>;
	constructor() {
		this.remotecollection = new SOSRemoteCollectionInstance();
		this.collectionGeneratorFunctions = [this.generateRandomUser, this.generateRandomPost, this.generateRandomComment];
	}

	public generateNDocuments(threshold:number, collection:SOSCollections){
		// generate random users
		for(let i:number = 0; i < threshold; i++){
			this.remotecollection.RemoteCollectionGroup[collection].model.create(this.collectionGeneratorFunctions[collection](), (err) => {
				if (err) { console.log(err); }
			});
		}
	}

	private generateRandomUser() {
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

	private generateRandomPost() {
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

	private generateRandomComment() {
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


let Generator = new SOSDocumentGenerator();
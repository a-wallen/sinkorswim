const fake = require("faker");

import { UserModel } from '../model/UserModel';
import { PostModel } from '../model/PostModel';
import { CommentModel } from '../model/CommentModel';

import {IUserModel} from '../interfaces/IUserModel';
import {IPostModel} from '../interfaces/IPostModel';
import {ICommentModel} from '../interfaces/ICommentModel';

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
	constructor() {
		this.remotecollection = new SOSRemoteCollectionInstance();
	}

	public generateUserFootprints(amount:number){
		var _userDocs:IUserModel[] = [];
		var _userPostDocs:IPostModel[] = [];
		var _userCommentDocs:ICommentModel[] = [];
		for(let i:number = 0; i < amount; i++){ // generates amount (n) users
			var _currentUser:IUserModel = this.generateRandomUser();
			_userDocs.push(_currentUser);
			for(let j:number = 0; j < amount; j++){ // generates amount^2 posts [ n posts under n users ]
				var _userPost:IPostModel = this.generateRandomPost();
				_userPost["userId"] = _currentUser["userId"];
				_userPostDocs.push(_userPost);
				for(let k:number = 0; k < amount; k++){ // generates amount^3 comments [ n comments for n posts for n users ]
					var _userComment:ICommentModel = this.generateRandomComment();
					_userComment["userId"] = _currentUser["userId"];
					_userComment["postId"] = _userPost["postId"];
					_userCommentDocs.push(_userComment);
				}
			}
		}
		_userDocs.forEach((document) => {
			this.remotecollection.Users.model.create(document, (err) =>{
				if(err) { console.log(err); }
			});
		});
		_userPostDocs.forEach((document) => {
			this.remotecollection.Posts.model.create(document, (err) =>{
				if(err) { console.log(err); }
			});
		});
		_userCommentDocs.forEach((document) => {
			this.remotecollection.Comments.model.create(document, (err) =>{
				if(err) { console.log(err); }
			});
		});
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
Generator.generateUserFootprints(3);
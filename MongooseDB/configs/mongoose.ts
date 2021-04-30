import * as dotenv from 'dotenv';

dotenv.config();


const ADMINS = {
	'wallenstephe' : 'WMNUeZvP8zL8VIP0',
	'ssheikh' : '0sZvkQhy40adwPxk',
	'outcaltk' : '4NwFs2HdBRPIMbyY',
	'larsonlaura' : 'nX0oolK6ReQ5X9Eu'
};

// SET YOUR THIS VARIABLE TO YOUR USERNAME
let dev_usr: string = 'wallenstephe';

const MONGO_USERNAME = process.env.MONGO_USERNAME || dev_usr;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ADMINS[dev_usr];
const MONGO_HOST = process.env.MONGO_URL || 'mongodb+srv://soscluster.0r8jh.mongodb.net/dev?authSource=admin';
const MONGO_OPTIONS = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	socketTimeoutMS: 30000,
	keepAlive: true,
	poolSize: 50,
	autoIndex: false,
	retryWrites: false
};

const MONGO = {
	host: MONGO_HOST,
	username: MONGO_USERNAME,
	password: MONGO_PASSWORD,
	options: MONGO_OPTIONS,
};

export default MONGO;

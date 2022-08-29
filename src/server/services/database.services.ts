import * as mongoDB from 'mongodb';

export const collections: {tasks?: mongoDB.Collection} = {};

export const connectToDb = async () => {
	const client: mongoDB.MongoClient = new mongoDB.MongoClient(
		process.env.DB_CONNECTION!,
	);

	await client.connect();

	const db: mongoDB.Db = client.db(process.env.DB_NAME);
	await db.command({
		collMod: 'tasks',
		validator: {
			$jsonSchema: {
				bsonType: 'object',
				required: ['name', 'completed'],
				additionalProperties: false,
				properties: {
					_id: {},
					name: {
						bsonType: 'string',
						description: '\'name\' is required and is a string',
					},
					completed: {
						bsonType: 'bool',
						description: '\'completed\' is required and is a bool',
					},
				},
			},
		},
	});

	const tasksList: mongoDB.Collection = db.collection('tasks');

	collections.tasks = tasksList;

	console.log(
		`Successfully connected to database: ${process.env
			.DB_NAME!} and collection: ${process.env.TODO_COLLECTION_NAME!}`,
	);
};

import type {Express} from 'express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectToDb} from './services/database.services';
import {tasksRouter} from './routes/tasks.router';

const app: Express = express();
dotenv.config({path: 'config.env'});
const port = process.env.PORT! || 3031;

connectToDb()
	.then(() => {
		app.use(cors());
		app.use(tasksRouter);
		app.listen(port, () => {
			console.log(`server started on port: ${port}`);
		});
	})
	.catch((error: Error) => {
		console.error('Database connection failed');
		console.log(error);
		process.exit();
	});

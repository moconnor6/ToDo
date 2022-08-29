import type {Request, Response} from 'express';
import {ObjectId} from 'mongodb';
import {collections} from '../services/database.services';

export const getAllTasks = async (req: Request, res: Response) => {
	try {
		const tasks = await collections.tasks?.find({}).toArray();
		res.status(200).json(tasks);
	} catch (err: unknown) {
		res.status(500).json(err);
	}
};

export const getActiveTasks = async (req: Request, res: Response) => {
	try {
		const tasks = await collections.tasks?.find({completed: false}).toArray();
		res.status(200).json(tasks);
	} catch (err: unknown) {
		res.status(500).json(err);
	}
};

export const getCompletedTasks = async (req: Request, res: Response) => {
	try {
		const tasks = await collections.tasks?.find({completed: true}).toArray();
		res.status(200).json(tasks);
	} catch (err: unknown) {
		res.status(500).json(err);
	}
};

export const addNewTask = async (req: Request, res: Response) => {
	try {
		const task = req.body;
		const result = await collections.tasks?.insertOne(task);
		const tasksList = await collections.tasks?.find({}).toArray();
		result
			? res.status(201).json({
				message: 'success adding new task',
				tasks: tasksList,
			})
			: res.status(500).json('failed to add new task');
	} catch (err: unknown) {
		res.status(400).json(err);
	}
};

export const updateTask = async (req: Request, res: Response) => {
	const {id} = req.params;

	try {
		const updatedState = req.body.completed;
		const query = {_id: new ObjectId(id)};
		const result = await collections.tasks?.updateOne(query, {
			$set: {completed: updatedState},
		});
		const tasksList = await collections.tasks?.find({}).toArray();
		result
			? res.status(200).json({
				message: `Successfully updated task with id ${id}`,
				tasks: tasksList,
			})
			: res.status(304).json(`task with id: ${id} not updated`);
	} catch (err: unknown) {
		res.status(400).json(err);
	}
};

export const deleteTaskById = async (req: Request, res: Response) => {
	const {id} = req.params;

	try {
		const query = {_id: new ObjectId(id)};
		const result = await collections.tasks?.deleteOne(query);
		const tasksList = await collections.tasks?.find({}).toArray();
		if (result && result.deletedCount) {
			res.status(202).json({
				message: `successfully deleted task with id ${id}`,
				tasks: tasksList,
			});
		} else if (!result) {
			res.status(400).json(`failed to remove task with id ${id}`);
		} else if (!result.deletedCount) {
			res.status(404).json(`task with id ${id} does not exist`);
		}
	} catch (err: unknown) {
		res.status(400).json(err);
	}
};

export const deleteAllTasks = async (_req: Request, res: Response) => {
	try {
		const tasks = await collections.tasks?.deleteMany({});
		res.status(202).json('mass deletion was successful');
	} catch (err: unknown) {
		res.status(500).json(err);
	}
};

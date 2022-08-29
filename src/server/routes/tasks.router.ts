import express from 'express';
import {
	addNewTask,
	deleteAllTasks,
	deleteTaskById,
	getActiveTasks,
	getAllTasks,
	getCompletedTasks,
	updateTask,
} from './tasks.router-methods';

export const tasksRouter = express.Router();
tasksRouter.use(express.json());

// GET all tasks
tasksRouter.get('/tasks', getAllTasks);

// GET all active tasks
tasksRouter.get('/tasks/active', getActiveTasks);

// GET all completed tasks
tasksRouter.get('/tasks/completed', getCompletedTasks);

// POST add new task
tasksRouter.post('/task/add', addNewTask);

// PUT update completed status
tasksRouter.put('/task/update/:id', updateTask);

// DELETE task with certain id
tasksRouter.delete('/task/delete/:id', deleteTaskById);

// For testing -- DELETE all
tasksRouter.delete('/tasks/delete', deleteAllTasks);

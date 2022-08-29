import { ObjectID } from "bson";
import React, { useState } from "react";
import { ITask } from "../../utils/types";
import ToDoTask from "./todo-task";

const FILTER: any = {
  All: () => true,
  Active: (task: ITask) => !task.completed,
  Completed: (task: ITask) => task.completed,
};

const ToDoList: React.FC<{
  tasks: ITask[];
  updateTask: (id: string, complete: boolean) => void;
  deleteTask: (id: string) => void;
}> = (props) => {
  const [filter, setFilter] = useState("All");

  const tasksVisible = props.tasks
    ?.filter(FILTER[filter])
    .map((task: ITask) => (
      <ToDoTask
        key={task._id}
        task={task}
        updateTask={props.updateTask}
        deleteTask={props.deleteTask}
      />
    ));

  return (
    <div className="list-box">
      <ul>{tasksVisible}</ul>
      <div
        className={!props.tasks.length ? "invisible filter-box" : "filter-box"}
      >
        <button type="button" onClick={() => setFilter("All")}>
          All
        </button>
        <button type="button" onClick={() => setFilter("Active")}>
          Active
        </button>
        <button type="button" onClick={() => setFilter("Completed")}>
          Completed
        </button>
      </div>
      <h2>total tasks: {props.tasks.length}</h2>
    </div>
  );
};

export default ToDoList;

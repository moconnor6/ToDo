import React from "react";
import { ITask } from "../../utils/types";

const ToDoTask: React.FC<{
  task: ITask;
  updateTask: (id: string, complete: boolean) => void;
  deleteTask: (id: string) => void;
}> = (props) => {
  return (
    <li className="task-box">
      <label>
        <input
          type="checkbox"
          defaultChecked={props.task.completed}
          onChange={() => {
            props.updateTask(props.task._id!, !props.task.completed);
          }}
        />
        <span>{props.task.name}</span>
      </label>
      <button
        type="button"
        onClick={() => {
          props.deleteTask(props.task._id!);
        }}
      >
        delete
      </button>
    </li>
  );
};

export default ToDoTask;

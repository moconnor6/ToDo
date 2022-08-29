import React, { useState } from "react";
import { ITask } from "../../utils/types";

const ToDoEntry: React.FC<{ addTask: (task: ITask) => void }> = (props) => {
  const [task, setTask] = useState({ name: "", completed: false });

  return (
    <div className="entry-box">
      <h1 id="title">ToDo</h1>
      <input
        id="enterInput"
        type="text"
        placeholder="Add a Task"
        value={task.name}
        onChange={(ev) =>
          setTask(() => ({
            name: ev.target.value,
            completed: false,
          }))
        }
        onKeyUp={(ev) => {
          if (ev.key === "Enter" && task.name.trim() != "") {
            props.addTask(task);
            // reset state
            setTask({
              name: "",
              completed: false,
            });
          }
        }}
      />
    </div>
  );
};

export default ToDoEntry;

import React, { useEffect, useState } from "react";
import { ITask } from "../../utils/types";
import ToDoEntry from "./todo-entry";
import ToDoList from "./todo-list";

const ToDoApp: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const url = `http://localhost:3031/tasks`;
    fetch(url)
      .then((res) => {
        if (res.status !== 200) {
          const message = `an error occured: ${res.statusText}`;
          window.alert(message);
          return;
        }
        return res.json();
      })
      .then((res) => {
        setTasks(res);
      })
      .catch((err) => console.error(err));
  }, [tasks.length]);

  const handleAddTask = async (task: ITask) => {
    const url = "http://localhost:3031/task/add";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => {
        if (res.status !== 201) {
          const message = `an error occured: ${res.statusText}`;
          window.alert(message);
          return;
        }
        return res.json();
      })
      .then((res) => setTasks(res.tasks));
  };

  const handleUpdateTask = async (id: string, complete: boolean) => {
    const url = `http://localhost:3031/task/update/${id}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: complete }),
    })
      .then((res) => {
        if (res.status !== 200) {
          const message = `an error occured: ${res.statusText}`;
          window.alert(message);
          return;
        }
        return res.json();
      })
      .then((res) => setTasks(res.tasks));
  };

  const handleDeleteTask = async (id: string) => {
    const url = `http://localhost:3031/task/delete/${id}`;
    await fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 202) {
          const message = `an error occured: ${res.statusText}`;
          window.alert(message);
          return;
        }
        return res.json();
      })
      .then((res) => setTasks(res.tasks));
  };

  return (
    <div className="app-box">
      <ToDoEntry addTask={handleAddTask} />
      <ToDoList
        tasks={tasks}
        updateTask={handleUpdateTask}
        deleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default ToDoApp;

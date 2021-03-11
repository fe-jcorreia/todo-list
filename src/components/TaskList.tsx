import { useState } from "react";
import { Task } from "./Task";
import { FiCheckSquare } from "react-icons/fi";

import "../styles/tasklist.scss";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if (newTaskTitle !== "") {
      let id = Math.floor(Math.random() * 100);
      while (tasks.find((element) => element.id === id) !== undefined) {
        id = Math.floor(Math.random() * 100);
      }
      const newTask = {
        id: id,
        title: newTaskTitle,
        isComplete: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasksList = tasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    );
    setTasks(newTasksList);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const newTasksList = tasks.filter((task) => task.id !== id);
    setTasks(newTasksList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              handleToggleTaskCompletion={handleToggleTaskCompletion}
              handleRemoveTask={handleRemoveTask}
            />
          ))}
        </ul>
      </main>
    </section>
  );
}

"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CloseIcon } from "./Icons/CloseIcon";
import { TodoProps } from "../types/Types";

interface EditTodoProps {
  index: number;
  title: string;
  description: string;
  dueDate: string;
  isDone: boolean;
  setEditTodoIndex: Dispatch<SetStateAction<number | null>>;
  allTodos: TodoProps[];
  setAllTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
}

export default function Form({
  index,
  title,
  description,
  dueDate,
  isDone,
  setEditTodoIndex,
  allTodos,
  setAllTodos,
}: EditTodoProps) {
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newDueDate, setNewDueDate] = useState<string>(dueDate);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (newTitle === "") return;

    const updatedTodo = {
      title: newTitle,
      description: newDescription,
      dueDate: newDueDate,
      isDone: isDone,
    };

    // Update the todo in the local state and localStorage
    const updatedTodos = allTodos.map((todo, i) =>
      i === index ? updatedTodo : todo
    );

    // Update localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setAllTodos(updatedTodos);

    // Close the edit form
    setEditTodoIndex(null);
  }

  //Make a CSS class for the input styling

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 font-primary absolute z-10 bg-slate-100 p-6 rounded-t-lg w-full left-0 bottom-0 h-[calc(100vh-6rem)] shadow-[0_15px_30px_rgba(0,0,0,0.4),0_5px_15px_rgba(0,0,0,0.2)]"
    >
      <h3 className="text-2xl font-bold mb-2">Edit Task</h3>
      <CloseIcon
        onClick={() => setEditTodoIndex(null)}
        className="absolute right-5 cursor-pointer stroke-current"
        width="24"
        height="24"
      />

      <label htmlFor="title">
        Title <span className="text-red-500">*</span>
      </label>
      <input
        className="mb-4 outline-none border border-black rounded p-4 placeholder:italic placeholder:text-slate-400 text-black"
        type="text"
        placeholder="Title..."
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />

      <label htmlFor="description">Description (Optional)</label>
      <input
        className="mb-4 outline-none border border-black rounded p-4 placeholder:italic placeholder:text-slate-400 text-black"
        type="text"
        placeholder="Description..."
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />

      <label htmlFor="date">Deadline (Optional)</label>
      <input
        className="mb-4 outline-none border border-black rounded p-4 placeholder:italic placeholder:text-slate-400 text-black"
        type="date"
        placeholder="Date..."
        value={newDueDate}
        onChange={(e) => setNewDueDate(e.target.value)}
      />

      <button className="flex-wrap w-full sm:w-auto sm:flex-none bg-green-600 hover:bg-green-700 active:bg-green-800 border-none p-4 text-white cursor-pointer rounded">
        Save changes
      </button>
    </form>
  );
}

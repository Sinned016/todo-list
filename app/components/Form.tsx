"use client";
import React, { useState } from "react";
import { FormProps } from "../types/Types";
import { CloseIcon } from "./Icons/CloseIcon";

export default function Form({
  allTodos,
  setAllTodos,
  setAddNewTodo,
}: FormProps) {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newDueDate, setNewDueDate] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (newTitle === "") return;

    const newTodo = {
      title: newTitle,
      description: newDescription,
      dueDate: newDueDate,
      isDone: false,
    };

    localStorage.setItem("todos", JSON.stringify([...allTodos, newTodo]));
    setAllTodos([...allTodos, newTodo]);
    setAddNewTodo(false);
    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
  }

  function addMoreTasks(e: React.FormEvent) {
    e.preventDefault();

    if (newTitle === "") return;

    const newTodo = {
      title: newTitle,
      description: newDescription,
      dueDate: newDueDate,
      isDone: false,
    };

    localStorage.setItem("todos", JSON.stringify([...allTodos, newTodo]));
    setAllTodos([...allTodos, newTodo]);
    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
  }

  //Make a CSS class for the input styling

  return (
    <form
      className="flex flex-col gap-2 font-primary absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 bg-slate-100 p-6 rounded-t-lg w-full sm:w-[600px] h-[calc(768px-6rem)] shadow-[0_15px_30px_rgba(0,0,0,0.4),0_5px_15px_rgba(0,0,0,0.2)]"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-bold mb-2">Add Task</h3>
      <CloseIcon
        onClick={() => setAddNewTodo(false)}
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

      <button
        onClick={addMoreTasks}
        className="flex-wrap w-full sm:w-auto sm:flex-none bg-blue-600 hover:bg-blue-700 active:bg-blue-800 border-none p-4 text-white cursor-pointer rounded"
      >
        Add More Tasks
      </button>

      <button
        onClick={handleSubmit}
        className="flex-wrap w-full sm:w-auto sm:flex-none bg-green-600 hover:bg-green-700 active:bg-green-800 border-none p-4 text-white cursor-pointer rounded"
      >
        Add Task
      </button>
    </form>
  );
}

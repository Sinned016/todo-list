"use client";
import React, { useState } from "react";
import { TodoListProps } from "../types/Types";

export default function Form({ allTodos, setAllTodos }: TodoListProps) {
  const [newTodo, setNewTodo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (newTodo === "") return;

    localStorage.setItem("todos", JSON.stringify([...allTodos, newTodo]));
    setAllTodos([...allTodos, newTodo]);
    setNewTodo("");
  }

  return (
    <form
      className="flex flex-wrap gap-2 font-primary w-full mb-8"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-1 md:mr-2 outline-none bg-gray-100 border rounded p-4 placeholder:italic placeholder:text-slate-400 text-black"
        type="text"
        placeholder="New Todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="flex-wrap w-full sm:w-auto sm:flex-none bg-green-600 hover:bg-green-700 active:bg-green-800 border-none p-4 text-white cursor-pointer rounded"
      >
        Add Task
      </button>
    </form>
  );
}

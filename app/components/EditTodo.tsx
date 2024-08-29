"use client";
import React, { useState } from "react";
import { EditListProps, TodoListProps } from "../types/Types";
import { EditIcon } from "./Icons/EditIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";

export default function EditTodo({
  allTodos,
  setAllTodos,
  todo,
  index,
}: EditListProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which todo is being edited
  const [editValue, setEditValue] = useState<string>("");

  function deleteTodo(todo: string) {
    const newTodos = allTodos.filter((item) => item !== todo);

    localStorage.setItem("todos", JSON.stringify(newTodos));
    setAllTodos(newTodos);
  }

  function startEdit(index: number) {
    setEditIndex(index);
    setEditValue(allTodos[index]);
  }

  function saveEdit() {
    if (editIndex !== null) {
      const newTodos = allTodos;
      newTodos[editIndex] = editValue;
      setAllTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setEditIndex(null);
      setEditValue("");
    }
  }

  return (
    <div>
      <div>
        {editIndex === index ? (
          <input
            className="box-border p-2 text-black bg-gray-300 rounded w-96"
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveEdit();
              }
            }}
          />
        ) : (
          <p className="">{todo}</p>
        )}
      </div>

      <div className="flex items-center">
        <button className="mr-4" onClick={() => startEdit(index)}>
          <EditIcon width="24" height="24" />
        </button>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={() => deleteTodo(todo)}
        >
          <DeleteIcon width="24" height="24" />
        </button>
      </div>
    </div>
  );
}

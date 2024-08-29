"use client";
import React, { useEffect, useState } from "react";
import { DeleteIcon } from "./Icons/DeleteIcon";
import { EditIcon } from "./Icons/EditIcon";
import Form from "./Form";
import { CircleIcon } from "./Icons/CircleIcon";
import { CheckedCircleIcon } from "./Icons/CheckedCircleIcon";
import {
  deleteTodo,
  finishedTask,
  undoFinishedTask,
} from "../functions/TodoFunctions";

export default function TodoList() {
  const [allTodos, setAllTodos] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which todo is being edited
  const [editValue, setEditValue] = useState<string>("");
  const [allCheckedTodos, setAllCheckedTodos] = useState<string[]>([]);

  console.log(allCheckedTodos);

  useEffect(() => {
    const todos = localStorage.getItem("todos");

    if (todos) {
      setAllTodos(JSON.parse(todos));
    }

    const finishedTodos = localStorage.getItem("finishedTodos");

    if (finishedTodos) {
      setAllCheckedTodos(JSON.parse(finishedTodos));
    }
  }, []);

  function startEdit(index: number) {
    if (editIndex) {
      setEditIndex(null);
      setEditValue("");
    }

    setEditIndex(index);
    setEditValue(allTodos[index]);
  }

  function saveEdit(todo: string) {
    if (editIndex !== null) {
      const newTodos = allTodos;
      newTodos[editIndex] = editValue;
      setAllTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setEditIndex(null);
      setEditValue("");

      if (allCheckedTodos.includes(todo)) {
        const newFinishedTodos = allCheckedTodos.filter(
          (item) => item !== todo
        );

        localStorage.setItem("finishedTodos", JSON.stringify(newFinishedTodos));

        setAllCheckedTodos(newFinishedTodos);
      }
    }
  }

  function cancelEdit() {
    setEditIndex(null);
    setEditValue("");
  }

  return (
    <div>
      <Form allTodos={allTodos} setAllTodos={setAllTodos} />

      <div className="max-h-[520px] overflow-y-auto">
        {allTodos.length > 0 ? (
          allTodos.map((todo, index) => (
            <div
              key={index}
              className=" flex justify-between align-center p-6 border rounded mb-2 bg-gray-800 text-white"
              style={{ opacity: 1, transform: "translateY(0)" }}
            >
              <div>
                {editIndex === index ? (
                  <input
                    className="box-border p-2 text-black bg-gray-300 rounded w-96"
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveEdit(todo);
                      }
                    }}
                  />
                ) : (
                  <div className="flex items-center transition ease-in-out">
                    {allCheckedTodos.includes(todo) ? (
                      <CheckedCircleIcon
                        className="mr-5 cursor-pointer"
                        width="32"
                        height="32"
                        onClick={() =>
                          undoFinishedTask(
                            todo,
                            allCheckedTodos,
                            setAllCheckedTodos
                          )
                        }
                      />
                    ) : (
                      <CircleIcon
                        className="mr-5 cursor-pointer transition ease-in-out"
                        width="32"
                        height="32"
                        color="white"
                        onClick={() =>
                          finishedTask(
                            todo,
                            allCheckedTodos,
                            setAllCheckedTodos
                          )
                        }
                      />
                    )}

                    <p className="">{todo}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                {editIndex === index ? (
                  <button className="mr-4" onClick={() => cancelEdit()}>
                    <EditIcon width="24" height="24" />
                  </button>
                ) : (
                  <button className="mr-4" onClick={() => startEdit(index)}>
                    <EditIcon width="24" height="24" />
                  </button>
                )}

                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => deleteTodo(todo, allTodos, setAllTodos)}
                >
                  <DeleteIcon width="24" height="24" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-white font-normal text-lg">No tasks yet..</h3>
        )}
      </div>
    </div>
  );
}

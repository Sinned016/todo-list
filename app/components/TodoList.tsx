"use client";
import React, { useEffect, useState } from "react";
import { DeleteIcon } from "./Icons/DeleteIcon";
import { EditIcon } from "./Icons/EditIcon";
import Form from "./Form";
import { CircleIcon } from "./Icons/CircleIcon";
import { CheckedCircleIcon } from "./Icons/CheckedCircleIcon";
import { TodoProps } from "../types/Types";
import EditTodo from "./EditTodo";

export default function TodoList() {
  const [allTodos, setAllTodos] = useState<TodoProps[]>([]);
  const [addNewTodo, setAddNewTodo] = useState<boolean>(false);
  const [editTodoIndex, setEditTodoIndex] = useState<number | null>(null);

  useEffect(() => {
    const todos = localStorage.getItem("todos");

    if (todos) {
      setAllTodos(JSON.parse(todos));
    }
  }, []);

  function deleteTodo(title: string) {
    const filteredTodos = allTodos.filter((todo) => todo.title !== title);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
    setAllTodos(filteredTodos);
  }

  function handleEdit(index: number) {
    setEditTodoIndex(index === editTodoIndex ? null : index);
  }

  function toggleTodo(e: React.FormEvent, index: number) {
    const updatedTodos = allTodos.map((todo, i) =>
      i === index ? { ...todo, isDone: !todo.isDone } : todo
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setAllTodos(updatedTodos);
  }

  return (
    <div>
      <div className="border-b border-gray-500 flex align-center justify-between pb-4">
        <div>
          <h3 className="text-xl font-bold">My tasks</h3>
          <p className="">You have {allTodos.length} tasks left!</p>
        </div>

        <button
          onClick={() => setAddNewTodo(!addNewTodo)}
          className=" bg-gray-600 hover:bg-gray-700 active:bg-gray-800 border-none px-10 py-2 sm:px-20 text-white cursor-pointer rounded"
        >
          Add Task
        </button>
      </div>

      {addNewTodo && (
        <Form
          allTodos={allTodos}
          setAllTodos={setAllTodos}
          setAddNewTodo={setAddNewTodo}
        />
      )}

      <div className="max-h-[80vh] sm:max-h-[568px] overflow-auto scrollbar-thin ">
        {allTodos.map((todo, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-gray-500 bg-slate-100 border rounded-lg mt-4 "
          >
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => toggleTodo(e, index)}
                className="cursor-pointer"
              >
                {todo.isDone ? (
                  <CheckedCircleIcon width="32" height="32" />
                ) : (
                  <CircleIcon width="32" height="32" />
                )}
              </button>

              <div className="max-w-[230px] sm:max-w-[390px]">
                {todo.isDone ? (
                  <h4 className="font-bold break-words mb-1 line-through">
                    {todo.title}
                  </h4>
                ) : (
                  <h4 className="font-bold break-words mb-1">{todo.title}</h4>
                )}
                <p className="text-gray-500 break-words">{todo.description}</p>
                <p className="text-red-400 text-sm mt-1">{todo.dueDate}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(index)}
                className="cursor-pointer"
              >
                <EditIcon width="24" height="24" />
              </button>

              <button
                onClick={() => deleteTodo(todo.title)}
                className="cursor-pointer"
              >
                <DeleteIcon width="24" height="24" />
              </button>
            </div>

            {editTodoIndex === index && (
              <EditTodo
                index={index}
                title={todo.title}
                description={todo.description}
                dueDate={todo.dueDate}
                isDone={todo.isDone}
                setEditTodoIndex={setEditTodoIndex}
                allTodos={allTodos}
                setAllTodos={setAllTodos}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

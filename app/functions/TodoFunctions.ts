export function deleteTodo(
  todo: string,
  allTodos: string[],
  setAllTodos: (todos: string[]) => void
) {
  const newTodos = allTodos.filter((item) => item !== todo);
  localStorage.setItem("todos", JSON.stringify(newTodos));
  setAllTodos(newTodos);
}

export function finishedTask(
  todo: string,
  allCheckedTodos: string[],
  setAllCheckedTodos: (todos: string[]) => void
) {
  const newFinishedTodos = [...allCheckedTodos, todo];

  localStorage.setItem("finishedTodos", JSON.stringify(newFinishedTodos));

  setAllCheckedTodos(newFinishedTodos);
}

export function undoFinishedTask(
  todo: string,
  allCheckedTodos: string[],
  setAllCheckedTodos: (todos: string[]) => void
) {
  const newFinishedTodos = allCheckedTodos.filter((item) => item !== todo);

  localStorage.setItem("finishedTodos", JSON.stringify(newFinishedTodos));

  setAllCheckedTodos(newFinishedTodos);
}

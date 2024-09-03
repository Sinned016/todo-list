export type TodoListProps = {
  allTodos: string[];
  setAllTodos: React.Dispatch<React.SetStateAction<string[]>>;
};

export type FormProps = {
  allTodos: TodoProps[];
  setAllTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
  setAddNewTodo: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditListProps = {
  allTodos: string[];
  setAllTodos: React.Dispatch<React.SetStateAction<string[]>>;
  todo: string;
  index: number;
};

export type TodoProps = {
  title: string;
  description: string;
  dueDate: string;
  isDone: boolean;
};

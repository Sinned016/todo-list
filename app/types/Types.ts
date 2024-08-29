export type TodoListProps = {
  allTodos: string[];
  setAllTodos: React.Dispatch<React.SetStateAction<string[]>>;
};

export type EditListProps = {
  allTodos: string[];
  setAllTodos: React.Dispatch<React.SetStateAction<string[]>>;
  todo: string;
  index: number;
};

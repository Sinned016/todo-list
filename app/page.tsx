import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="sm:w-3/4  2xl:w-2/5 bg-slate-100 p-6 shadow-xl min-h-screen">
        <h1 className="text-4xl font-bold mb-6 font-sans mt-2">To-Do List</h1>

        <TodoList />
      </div>
    </div>
  );
}

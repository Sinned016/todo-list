import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen sm:flex sm:items-center sm:justify-center ">
      <div className="sm:rounded-lg bg-slate-100 p-6 shadow-[0_15px_30px_rgba(0,0,0,0.4),0_5px_15px_rgba(0,0,0,0.1)] min-h-screen sm:min-h-[768px] sm:max-h-[768px] sm:w-[600px] relative">
        <h1 className="text-4xl font-bold mb-6 font-sans mt-2">To-Do List</h1>

        <TodoList />
      </div>
    </div>
  );
}

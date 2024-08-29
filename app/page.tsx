import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="sm:w-3/4  2xl:w-2/5 bg-gray-700 p-8 rounded-md shadow-xl">
        <h1 className="text-white text-4xl font-bold text-center mb-6 font-sans">
          Todo List
        </h1>

        <TodoList />
      </div>
    </div>
  );
}

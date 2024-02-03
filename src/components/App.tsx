import Header from "./Header";
import TodoList from "./TodoList";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white lg:my-2">
      <div className="container mx-auto w-full max-w-screen-md flex-1">
        <Header />
        <TodoList />
      </div>
    </div>
  );
}

export default App;

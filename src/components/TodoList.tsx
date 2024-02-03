import { forwardRef, useEffect } from "react";
import FlipMove from "react-flip-move";

import { selectFilter } from "redux/features/filter/filterSlice";
import { TodoItem, addToList, selectTodo } from "redux/features/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import Filter from "./Filter";
import TodoItemComponent from "./TodoItem";

import { mockupTodos } from "utils/mockups";

interface FlipMoveTodoItemProps {
  todo: TodoItem;
}

const FlipMoveTodoItem = forwardRef<HTMLDivElement, FlipMoveTodoItemProps>(({ todo }, ref) => (
  <div ref={ref}>
    <TodoItemComponent key={todo.id} todo={todo} />
  </div>
));

const TodoList = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(selectTodo);
  const filter = useAppSelector(selectFilter);

  useEffect(() => {
    if (todo.items.length === 0) {
      mockupTodos.forEach(item => {
        dispatch(addToList(item));
      });
    }
  }, [dispatch, todo]);

  const filteredItems = todo.items
    .filter(item => {
      if (filter.state === "ALL") {
        return true;
      } else {
        return item.status === filter.state;
      }
    })
    .sort((a, b) => b.id - a.id);

  return (
    <div className="todo-list">
      <Filter />
      <div style={{ position: "relative" }}>
        <FlipMove typeName={null}>
          {filteredItems.map((todo: TodoItem) => (
            <FlipMoveTodoItem key={todo.id} todo={todo} />
          ))}
        </FlipMove>
      </div>
    </div>
  );
};

export default TodoList;

import { IoMdSave, IoMdTrash } from "react-icons/io";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { useEffect, useState } from "react";
import { TodoItem, removeFromList, selectTodo, setIsEditing, updateItem } from "redux/features/todo/todoSlice";

const TodoItemComponent: React.FC<{ todo: TodoItem }> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(selectTodo).isEditing;

  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const canEdit = todo.isEditable === true ? true : false;
    setIsEditable(canEdit);
  }, [todo.isEditable]);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeFromList(todo.id));
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedTodo: TodoItem = {
      ...todo,
      status: todo.status === "NEW" ? "INPROGRESS" : todo.status,
      title: editedTitle,
      isEditable: false,
    };

    dispatch(updateItem(updatedTodo));
    setIsEditable(false);
    dispatch(setIsEditing(false));
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  const handleCompleted = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedTodo: TodoItem = {
      ...todo,
      status: todo.status === "COMPLETED" ? "INPROGRESS" : "COMPLETED",
    };

    dispatch(updateItem(updatedTodo));
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (isEditing) {
      return;
    }

    const updatedTodo: TodoItem = {
      ...todo,
      isEditable: true,
    };

    dispatch(updateItem(updatedTodo));
    dispatch(setIsEditing(true));
    setIsEditable(true);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLSpanElement>) => {
    if (isEditing) {
      return;
    }

    const updatedTodo: TodoItem = {
      ...todo,
      isEditable: true,
    };

    dispatch(updateItem(updatedTodo));
    dispatch(setIsEditing(true));
    setIsEditable(true);
  };

  return (
    <div
      className={`todo-item ${
        todo.status === "COMPLETED" ? "completed" : "in-progress"
      } h-18 my-4 flex items-center justify-between rounded bg-gray-100 p-4`}>
      <button onClick={handleCompleted} className="todo-icon text-2xl">
        {todo.status === "COMPLETED" ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      </button>

      {isEditable ? (
        <input
          type="text"
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
          onKeyDown={handleInputSubmit}
          className="mx-4 w-full border-b-2 border-gray-500 focus:outline-none"
        />
      ) : (
        <span
          onTouchStart={handleTouchStart}
          onDoubleClick={handleDoubleClick}
          className="todo-title mx-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {todo.title}
        </span>
      )}
      <div className="flex-grow"></div>
      <div>
        {isEditable ? (
          <button onClick={handleSave} className={"text-2xl"}>
            <IoMdSave />
          </button>
        ) : (
          <button onClick={handleDelete} className={"text-2xl"}>
            <IoMdTrash />
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItemComponent;

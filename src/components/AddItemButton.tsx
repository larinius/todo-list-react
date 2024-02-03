import { useEffect, useState } from "react";

import { MdAdd } from "react-icons/md";

import { setFilter } from "redux/features/filter/filterSlice";
import { addToList, selectTodo, setIsEditing } from "redux/features/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const AddItemButton = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(selectTodo);
  const isEditing = useAppSelector(selectTodo).isEditing;

  const [hasNewItem, setHasNewItem] = useState(false);

  useEffect(() => {
    const newItemExists = todo.items.some(item => item.status === "NEW");
    setHasNewItem(newItemExists || isEditing);
  }, [todo, isEditing]);

  const addItemHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isEditing) {
      return;
    }

    const newItem = {
      id: Date.now(),
      title: "New Task",
      status: "NEW" as const,
      isEditable: true,
    };

    dispatch(addToList(newItem));
    dispatch(setFilter("ALL"));
    dispatch(setIsEditing(true));
  };

  return (
    <div>
      <button
        onClick={addItemHandler}
        disabled={hasNewItem}
        className={`mx-4 rounded p-2 text-6xl text-white ${hasNewItem ? "bg-gray-300" : "bg-green-300"}`}>
        <MdAdd />
      </button>
    </div>
  );
};

export default AddItemButton;

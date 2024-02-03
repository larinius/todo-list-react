import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface TodoItem {
  id: number;
  title: string;
  status: "NEW" | "COMPLETED" | "INPROGRESS";
  isEditable: boolean;
}

interface TodoState {
  items: TodoItem[];
  isEditing: boolean;
}

const initialState: TodoState = {
  items: [],
  isEditing: false,
};

const todoSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<TodoItem>) => {
      state.items.push(action.payload);
    },

    removeFromList: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    updateItem: (state, action: PayloadAction<TodoItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const selectTodo = (state: RootState) => state.todo;
export const { addToList, removeFromList, updateItem, setIsEditing } = todoSlice.actions;

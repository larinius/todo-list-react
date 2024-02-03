import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface FilterState {
  state: "ALL" | "INPROGRESS" | "COMPLETED";
}

const initialState: FilterState = {
  state: "ALL",
};

const filterSlice = createSlice({
  name: "filterlist",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<"ALL" | "INPROGRESS" | "COMPLETED">) => {
      state.state = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const selectFilter = (state: RootState) => state.filter;
export const { setFilter } = filterSlice.actions;

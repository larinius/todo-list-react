import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

import storage from "redux-persist/lib/storage";

import todoReducer from "./features/todo/todoSlice";
import filterReducer from "./features/filter/filterSlice";

const todoPersistConfig = {
  key: "todo",
  storage,
};

const filterPersistConfig = {
  key: "filter",
  storage,
};

const persistedTodoReducer = persistReducer(todoPersistConfig, todoReducer);
const persistedFilterReducer = persistReducer(filterPersistConfig, filterReducer);

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  reducer: {
    todo: persistedTodoReducer,
    filter: persistedFilterReducer,
  },
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

import { configureStore } from '@reduxjs/toolkit';
import { reducer as todosReducer } from '../features/todos/todosSlice';

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
});

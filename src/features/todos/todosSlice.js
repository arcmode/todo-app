import { createSlice } from '@reduxjs/toolkit';

const defaultTodos = [{
  title: 'Complete 10 TODOs',
  description: '\'Practice makes the master.\' — Patrick Rothfuss',
  status: 'PENDING',
  dueDate: void 0,
  categories: ['hello-world']
}, {
  title: 'Track issue: Semantic-UI-React refs',
  description: '<a href="https://github.com/Semantic-Org/Semantic-UI-React/issues/3819">https://github.com/Semantic-Org/Semantic-UI-React/issues/3819</a>',
  status: 'PENDING',
  dueDate: void 0,
  categories: ['foo', 'bar'],
}, {
  title: 'Implement a WYSIWYG editor',
  description: 'Have fun',
  status: 'PENDING',
  dueDate: void 0,
  categories: ['real-world'],
}, {
  title: 'Implement Multiple TODO List',
  description: 'As a User I want to move items between lists',
  status: 'PENDING',
  dueDate: void 0,
  categories: ['real-world'],
}];

const todoTemplate = {
  title: 'Edit Title',
  description: 'Edit Description',
  status: 'PENDING',
  dueDate: void 0,
  categories: ['grooming'],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [...defaultTodos.map(todo => ({ ...todo, }))],
  },
  reducers: {
    add: (state, { payload: { board } }) => {
      state[board] = [...state[board], { ...todoTemplate }];
    },
    complete: (state, { payload: { board, todo } }) => {
      state[board][todo].status = 'COMPLETE';
    },
    edit: (state, { payload: { data, todo, board } }) => {
      const {
        categories,
        description,
        dueDate,
        title,
      } = data;
      state[board][todo] = {
        ...state[board][todo],
        categories,
        description,
        dueDate,
        title,
      };
    },
    remove: (state, { payload: { todo, board } }) => {
      state[board] = state[board]
        .slice(0, todo)
        .concat(state[board].slice(todo+1));
    },
    resetStatus: (state, { payload: { todo, board } }) => {
      state[board][todo].status = 'PENDING';
    },
  },
});

export const {
  add,
  addSubtask,
  complete,
  edit,
  remove,
  resetStatus
} = todosSlice.actions;

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectTodos = state => state.todos;

export const reducer = todosSlice.reducer;

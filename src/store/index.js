import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

const oldState = JSON.parse(localStorage.getItem('state') || '{"todos":[]}');
var currentTodoId = oldState.todos.length;

const store = createStore((state = oldState, action) => {
  switch (action.type) {
    case 'COMPLETE_TODO':
      var { todo } = action.payload;

      todo.complete = todo.complete ? false : true;
      todo.completed_at = new Date();

      state.todos = state.todos.map(_todo => _todo.id === todo.id ? todo : _todo);
      break;
    case 'NEW_TODO':
      state.todos = [
        {
          id: currentTodoId++,
          title: "New Todo",

          body: "",

          created_at: new Date(),
          complete: false,
          ...action.payload.todo
        },

        ...state.todos
      ];

      break;
    case 'EDIT_TODO':
      var { todo } = action.payload;

      state.todos = state.todos.map(_todo => _todo.id === todo.id ? todo : _todo);
      state.todo = todo;

      break;
    case 'REMOVE_TODO':
      var { todo } = action.payload;

      state.todos = state.todos.filter(_todo => _todo.id === todo.id ? todo : _todo);
      break;
    case 'SELECT_TODO':
      var { todo } = action.payload;

      state.todo = todo;
      break;
    case 'DUPLICATE_TODO':
      var { todo } = action.payload;

      const duplicated = Object.assign({}, todo);
      duplicated.id = currentTodoId++;

      state.todos = [duplicated, ...state.todos];
      state.todo = duplicated;
      break;
  }

  return Object.assign({}, state);
}, applyMiddleware(logger));

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem('state', JSON.stringify(state));
})

export default store;

export const testTodo = {
  id: 0,
  title: "New Todo",
  body: "",
  created_at: new Date()
}

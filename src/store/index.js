import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

const defaultState = {
  todos: [],
  viewingIncomplete: true
}
const oldState = JSON.parse(localStorage.getItem('state') || JSON.stringify(defaultState));
var currentTodoId = oldState.todos.length;


function createTodoStore() {
  const _store = createStore((state = oldState, action) => {
    switch (action.type) {
      case 'TOGGLE_VIEWING_INCOMPLETE':
        state.viewingIncomplete = !state.viewingIncomplete;
        break;
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
  }, applyMiddleware(process.env.ENV === "test" ? function noop({ getState }) {
    return next => action => {
      next(action);
      return action
    }
  } : logger));
  
  return _store;
}

const store = createTodoStore();

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem('state', JSON.stringify(state));
})

export const testTodo = {
  id: 0,
  title: "New Todo",
  body: "",
  created_at: new Date()
}

export { createTodoStore, store };
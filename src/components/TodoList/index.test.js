import React from 'react';
import { shallow, mount, render } from 'enzyme';
import TodoList from './';

import { Provider } from 'react-redux';
import store from '../../store';

import { AppProvider, Card } from '@shopify/polaris';

import { newTodo, duplicateTodo } from '../../actions';

describe('<TodoList />', () => {
  const app = mount(
    <AppProvider>
      <Provider store={store}>
        <TodoList />
      </Provider>
    </AppProvider>
  );

  it('renders Card', () => {
    const card = app.find(Card);
    expect(card.length).toBe(1);
  });

  it('adds a Todo when newTodo is dispatched', () => {
    store.dispatch(newTodo());
    app.update();

    const list = app.find('ul.Polaris-ResourceList');

    expect(list.children().length).toBe(1)
  })

  it('renders correct text for new todo', () => {
    const newListItem = app.find('.todo-item h3');

    expect(newListItem.text()).toBe('0. New Todo');
  })

  it('adds a Todo when duplicateTodo is dispatched', () => {
    const todo = store.getState().todos[0];

    store.dispatch(duplicateTodo(todo));
    app.update();

    const list = app.find('ul.Polaris-ResourceList');

    expect(list.children().length).toBe(2)
  })

  it('renders correct text for duplicated todo', () => {
    const newListItem = app.find('.todo-item h3');

    expect(newListItem.first().text()).toBe('1. New Todo');
  })
})

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import TodoList from './';

import { Provider } from 'react-redux';
import { createTodoStore } from '../../store';

import { AppProvider, Card } from '@shopify/polaris';

import { newTodo, duplicateTodo, toggleViewingIncomplete, completeTodo } from '../../actions';

const store = createTodoStore();

describe('<TodoList />', () => {
  const app = mount(
    <AppProvider>
      <Provider store={store}>
        <TodoList viewingIncomplete={true} />
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

    expect(newListItem.text()).toBe(' New Todo');
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

    expect(newListItem.first().text()).toBe(' New Todo');
  })

  it('filters todos depending upon props.viewingIncomplete', () => {
    store.dispatch(toggleViewingIncomplete());

    app.update();

    const list = app.find('ul.Polaris-ResourceList');

    expect(list.children().length).toBe(0)
  })

  it('adds ✓ to completed todo title', () => {
    store.dispatch(completeTodo(store.getState().todos[0]));

    app.update();

    const firstListItem = app.find('.todo-item');

    expect(firstListItem.text()).toBe("✓ New Todo");
  })
})

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import TodoDetails from './';

import { Provider } from 'react-redux';
import { store } from '../../store';

import { AppProvider, Card } from '@shopify/polaris';

import { newTodo, editTodo, selectTodo, duplicateTodo, completeTodo } from '../../actions';

describe('<TodoDetails />', () => {
  store.dispatch(newTodo());
  store.dispatch(selectTodo(store.getState().todos[0]));

  const app = mount(
    <AppProvider>
      <Provider store={store}>
        <TodoDetails />
      </Provider>
    </AppProvider>
  );

  it('renders Card', () => {
    const card = app.find(Card);
    expect(card.length).toBe(1);
  });

  it('renders correct Todo heading', () => {
    const heading = app.find('.Polaris-TextField__Input');

    expect(heading.first().text()).toBe("New Todo")
  });

  it('updates Todo heading when mutated', () => {
    store.dispatch(editTodo({
      ...store.getState().todo,
      title: "New Test"
    }));

    const heading = app.find('.Polaris-TextField__Input').first();

    expect(heading.text()).toBe("New Test")
  })

  /* Changes wysiwyg to textfield. Fine anyways, there's no "presentation mode".
    As long as the handleChange function calls editTodo and that change is reflected,
    you can assume the same result will be achieved with the wysiwyg. Blotchy, but a temporary solution. */
  it('updates Todo body when mutated', () => {
    store.dispatch(editTodo({
      ...store.getState().todo,
      body: "New Test"
    }));

    const body = app.find('.Polaris-TextField__Input').last();

    expect(body.text()).toBe("New Test")
  })
})

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import TodoDetails from './';

import { Provider } from 'react-redux';
import store from '../../store';

import { AppProvider, Card } from '@shopify/polaris';

import { newTodo, editTodo, selectTodo, duplicateTodo } from '../../actions';

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

    expect(heading.text()).toBe("New Todo")
  });

  it('updates Todo heading when mutated', () => {
    store.dispatch(editTodo({
      title: "New Test",
      ...store.getState().todo
    }));

    app.update();

    const heading = app.find('.Polaris-TextField__Input');

    expect(heading.text()).toBe("New Test")
  })
})

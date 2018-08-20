import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Home from './';

import { Provider } from 'react-redux';
import store from '../../store';

import { AppProvider, Page } from '@shopify/polaris';
import TodoList from '../../components/TodoList';

import { addTodo } from '../../actions';

describe('<Home />', () => {
  const app = mount(
    <AppProvider>
      <Provider store={store}>
        <Home />
      </Provider>
    </AppProvider>
  );

  it('renders Page', () => {
    const page = app.find(Page);
    expect(page.length).toBe(1);
  });

  it('renders TodoList', () => {
    const list = app.find(TodoList);
    expect(list.length).toBe(1);
  });

  it('renders Add Todo button', () => {
    // There's another primary button that has display: none set, probably the spinner overlay
    const addTodo = app.find('.Polaris-Page__Actions .Polaris-Page__PrimaryAction .Polaris-Button.Polaris-Button--primary')
    expect(addTodo.length).toBe(1);
  })
})

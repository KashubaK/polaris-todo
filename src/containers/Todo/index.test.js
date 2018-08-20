import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Todo from './';

import { Provider } from 'react-redux';
import store, { testTodo } from '../../store';

import { newTodo } from '../../actions';

import { AppProvider, Page } from '@shopify/polaris';


describe('<Todo />', () => {
  store.dispatch(newTodo());
  const state = store.getState();
  const mockMatch = {
    params: {
      id: '0'
    }
  }
  
  console.log(testTodo);

  const app = mount(
    <AppProvider>
      <Provider store={store}>
        <Todo todos={state.todos} match={mockMatch} />
      </Provider>
    </AppProvider>
  );

  it('renders Page', () => {
    const page = app.find(Page);
    expect(page.length).toBe(1);
  });
})

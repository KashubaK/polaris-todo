import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Todo from './';

import { Provider } from 'react-redux';
import { createTodoStore, testTodo } from '../../store';

import { newTodo, editTodo, completeTodo } from '../../actions';

import { AppProvider, Page } from '@shopify/polaris';

const store = createTodoStore();

describe('<Todo />', () => {
  store.dispatch(newTodo());

  const state = store.getState();
  const mockMatch = {
    params: {
      id: '0'
    }
  }
  
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

  it('renders Breadcrumb', () => {
    const breadcrumbs = app.find('.Polaris-Breadcrumbs__Content');
    expect(breadcrumbs.length).toBe(1)
  })
  
  it('changes Title if todo is changed', () => {
    store.dispatch(editTodo({
      ...store.getState().todo,
      title: "Testing Title"
    }));

    const title = app.find('.Polaris-DisplayText.Polaris-DisplayText--sizeLarge');

    expect(title.text()).toBe("Testing Title")
  })

  it('marks Todo as complete', () => {
    store.dispatch(completeTodo(
      store.getState().todo
    ));

    const title = app.find('.Polaris-Page__Title');
    const completeButton = app.find('.Polaris-Page__Actions .Polaris-Page__PrimaryAction');

    expect(title.text()).toBe("✓ Testing Title");
    expect(completeButton.text()).toBe("Mark as incomplete");
  })
})

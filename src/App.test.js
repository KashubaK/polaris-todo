import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './store';

import { MemoryRouter } from 'react-router';

import Home from './containers/Home';


describe('<App />', () => {
  const app = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );

  it('renders without error', () => {
    const pageHeader = app.find('.App');
    expect(pageHeader.length).toBe(1);
  });
})

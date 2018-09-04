import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

configure({ adapter: new Adapter() });

var localStorageMock = (function() {
var store = {};
return {
    getItem: function(key) {
    return store[key];
    },
    setItem: function(key, value) {
    store[key] = value.toString();
    },
    clear: function() {
    store = {};
    },
    removeItem: function(key) {
    delete store[key];
    }
};
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

process.env.ENV = "test";
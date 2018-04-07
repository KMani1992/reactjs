import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import assert from 'assert'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

  it ('app should return hello',() => {
    let obj=new App();
      assert.equal(obj.sayHello(),'Hello');
  });

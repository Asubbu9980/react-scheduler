import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux'  
import rootReducer from './reducers'; 
  
const store = createStore(rootReducer)  

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
});

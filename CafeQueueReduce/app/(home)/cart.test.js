/*import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react-native';
import Cart from './cart';



describe('<cart />', () => {
  let store;


  it('updates total when incrementing item quantity', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    fireEvent.press(getByText('+'));
    expect(getByText('₪20')).toBeTruthy(); 
  });
  it('clears the cart when the cleanCart button is pressed', () => {
  
    fireEvent.press(getByText('Clean Cart'));
  
    expect(queryByText('₪0')).toBeTruthy();
  });
  it('displays a message when the cart is empty', () => {
    
    fireEvent.press(getByText('Clean Cart'));
   
    expect(getByText('Your cart is empty')).toBeTruthy();
  });
  
  
});*/
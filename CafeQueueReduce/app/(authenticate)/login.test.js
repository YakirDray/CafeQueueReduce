
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../(authenticate)/login'; 
import { supabase } from "../../Supabase"; 

// Mocking AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve(null)),
  getItem: jest.fn(() => Promise.resolve('someToken')),
}));

// Mocking Supabase signInWithPassword
jest.mock('../../Supabase', () => ({
  auth: {
    signInWithPassword: jest.fn(() => Promise.resolve({
      data: { session: { access_token: "someToken" } },
      error: null
    })),
  },
}));

describe('<Login />', () => {
  it('allows the user to log in successfully', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailInput = getByPlaceholderText('enter your Email');
    const passwordInput = getByPlaceholderText('enter your password');
    const loginButton = getByText('login');

    fireEvent.changeText(emailInput, '');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
it('displays an error message when login fails', async () => {
  supabase.auth.signInWithPassword.mockImplementationOnce(() => Promise.resolve({
    data: null,
    error: { message: 'Invalid login credentials' },
  }));

  const { getByPlaceholderText, getByText, findByText } = render(<Login />);

  fireEvent.changeText(getByPlaceholderText('enter your Email'), 'wrong@example.com');
  fireEvent.changeText(getByPlaceholderText('enter your password'), 'wrongPassword');
  fireEvent.press(getByText('login'));

  const errorMessage = await findByText('Invalid login credentials');

  expect(errorMessage).toBeTruthy();
});

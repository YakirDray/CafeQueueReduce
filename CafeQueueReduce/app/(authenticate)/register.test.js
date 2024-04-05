import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Register from './register'; // אנא התאם את הנתיב בהתאם למיקום הקובץ שלך
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../Supabase';

describe('<Register />', () => {
  beforeAll(() => {
    supabase.auth.signUp.mockResolvedValue({
      user: { id: '1', role: 'authenticated' },
      session: { access_token: 'token' },
      error: null,
    });
  });

  it('displays success message when registration is successful', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Register />);
    
    fireEvent.changeText(getByPlaceholderText('enter your Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('enter your Email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('enter your password'), 'password123');
    fireEvent.press(getByText('register'));

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('authToken', 'token');
      expect(queryByText('You have been successfully registered')).not.toBeNull();
    });
  });

  // ניתן להוסיף עוד בדיקות לסצנריות נוספות, לדוגמה: הרשמה שנכשלת
});

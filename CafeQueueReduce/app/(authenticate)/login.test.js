import { render, fireEvent } from '@testing-library/react-native';
import Login from './login'; // שים לב לנתיב הנכון לקובץ שלך

describe('<Login />', () => {
  it('allows entering email and password', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('enter your Email');
    const passwordInput = getByPlaceholderText('enter your password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });
});

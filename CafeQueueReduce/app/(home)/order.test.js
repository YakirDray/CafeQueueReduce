/*import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Order from './Order'; // הנתיב צריך להיות מתואם למיקום הפקטי של הקובץ
import moment from 'moment-timezone';
jest.mock('moment-timezone');

describe('Order Component Tests', () => {

  beforeEach(() => {
    moment.tz.mockReturnValue({
      format: jest.fn().mockReturnValue('01/01/2022 12:00:00'),
    });
  });

  it('displays the current time in Israel correctly', () => {
    const { getByText } = render(<Order />);
    const expectedTime = '01/01/2022 12:00:00';
    expect(getByText(new RegExp(expectedTime))).toBeTruthy();
  });

  it('updates tip amount and displays it when a tip option is pressed', () => {
    const { getByText } = render(<Order />);
    const tipAmount = "2₪";
    fireEvent.press(getByText(tipAmount));
    expect(getByText(`please pay ₪2 to your delivery agent at the time of delivery`)).toBeTruthy();
  });

  it('cancels the tip and removes the displayed message when cancel is pressed', () => {
    const { getByText, queryByText } = render(<Order />);
    fireEvent.press(getByText("2₪")); // הוספת טיפ
    fireEvent.press(getByText("(Cancel)")); // לחיצה על ביטול
    expect(queryByText("please pay ₪2 to your delivery agent at the time of delivery")).toBeNull();
  });
});*/

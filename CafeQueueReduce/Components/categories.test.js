/*import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Categories from './categories';
//Windows Copilot
test("לחיצה על כפתור 'חזור לקטגוריות' צריכה לסגור את המודל ולחזור למסך הקטגוריות", async () => {
  const { getByText, queryByText } = render(<Categories />);

  // בדיקה כי כאשר לוחצים על קטגוריה, המודל נפתח
  fireEvent.press(getByText("מנות עיקריות"));
  expect(queryByText("מנות עיקריות")).toBeTruthy();

  // בדיקה כי לאחר לחיצה על כפתור "חזור לקטגוריות", המודל נסגר
  fireEvent.press(getByText("חזור לקטגוריות"));
  expect(queryByText("מנות עיקריות")).toBeFalsy();
});

test("נגישות של הרכיב", async () => {
  const { getByText, getByTestId } = render(<Categories />);

  // בדיקה כי הכפתורים ניתנים ללחיצה
  const categoryButtons = ["מנות עיקריות", "קפה מכל הסוגים", "מאפים", "שתייה קרה", "מבצעים", "הפסקות איסוף אוכל"];
  categoryButtons.forEach((buttonText) => {
    expect(getByText(buttonText)).toBeTruthy();
    fireEvent.press(getByText(buttonText));
  });

  //בדיקת יחידה ללא שימוש בבינה מלאכותית - בדיקה כי הרשימה עוברת גלילה אופקית
  const flatList = getByTestId("categoriesList");
  expect(flatList.props.horizontal).toBe(true);
});
*/
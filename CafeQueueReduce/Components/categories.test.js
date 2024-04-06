import React from "react";

import Categories from "./categories";
test("לחיצה על כפתור 'חזור לקטגוריות' צריכה לסגור את המודל ולחזור למסך הקטגוריות", async () => {
  const { getByText, queryByText } = render(<Categories />);

  fireEvent.press(getByText("מנות עיקריות"));
  expect(queryByText("מנות עיקריות")).toBeTruthy();

  fireEvent.press(getByText("חזור לקטגוריות"));
  expect(queryByText("מנות עיקריות")).toBeFalsy();
});

test("נגישות של הרכיב", async () => {
  const { getByText, getByTestId } = render(<Categories />);

  const categoryButtons = [
    "מנות עיקריות",
    "קפה מכל הסוגים",
    "מאפים",
    "שתייה קרה",
    "מבצעים",
    "הפסקות איסוף אוכל",
  ];
  categoryButtons.forEach((buttonText) => {
    expect(getByText(buttonText)).toBeTruthy();
    fireEvent.press(getByText(buttonText));
  });

  const flatList = getByTestId("categoriesList");
  expect(flatList.props.horizontal).toBe(true);
});

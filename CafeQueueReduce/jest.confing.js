export const preset = 'jest-expo';
export const setupFilesAfterEnv = ['@testing-library/jest-native/extend-expect'];
export const transformIgnorePatterns = [
    "node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)"
];
  
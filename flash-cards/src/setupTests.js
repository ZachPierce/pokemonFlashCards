// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

//this following code can be ignored its simply to help the warning not display about react 18
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/ReactDOMTestUtils.act` is deprecated in favor of `React.act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
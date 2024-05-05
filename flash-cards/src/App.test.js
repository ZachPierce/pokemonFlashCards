import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';
import PokemonDetailCard from './components/PokemonDetailCard';
import PokemonQuizCard from './components/PokemonQuizCard';

//these first few tests are basic ui tests to tell us if our components are rendering properly
//we are simply looking for text in those components that should be there


//simple test to ensure our app is loading 
test('renders app', () => {
  render(<App />);
  const linkElement = screen.getByText(/PVFlashCards!/i);
  expect(linkElement).toBeInTheDocument();
});

//simple test to ensure our search bar is rendering on app load
test('renders search bar', () => {
  render(<App />);
  const linkElement = screen.getByText(/search/i);
  expect(linkElement).toBeInTheDocument();
});

//this is a test to ensure that when the reset button is clicked the info message is still displayed
//this is the start of testing that the reset button will reset our state variables
test('user can reset the app with home buttons', () => {
  
  const { getByTestId } = render(<App />);
  const resetButton = getByTestId("reset");

  fireEvent.click(resetButton);

  const linkElement = screen.getByText(/PVFlashCards!/i);
  expect(linkElement).toBeInTheDocument();
  
});


//simple test to ensure our pokemon cards are rendering data 
test('renders pokemon cards', () => {
  render(<PokemonDetailCard />);
  const linkElement = screen.getByText(/Test My Knowledge!/i);
  expect(linkElement).toBeInTheDocument();
});

//simple test to ensure our quiz cards are rendering -- this is kind of silly but it ensures
//that the component is functining at the most basic level
test('renders pokemon cards', () => {
  render(<PokemonQuizCard />);
  const linkElement = screen.getByText(/What is/i);
  expect(linkElement).toBeInTheDocument();
});







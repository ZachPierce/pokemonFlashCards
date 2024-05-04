import { render, screen } from '@testing-library/react';
import mockFetch from './mocks/mockFetch'

import App from './App';
import PokemonDetailCard from './components/PokemonDetailCard';
import PokemonQuizCard from './components/PokemonQuizCard';

//these first few tests are basic ui tests to tell us if our components are rendering properly
//we are simply looking for text in those components that should be there

//the following two functions were an attempt to get an API test working but I couldn't quite figure it out
beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
})

afterEach(() => {
  jest.restoreAllMocks()
});

//this isn't quite what we want but the idea being simulating a search from the user of a known
//pokemon that should be in our list

// const select = screen.getByRole("search");
// userEvent.selectOptions(select, "abamasnow");
// expect(select).toHaveValue("abamasnow");
// const pokeCards = screen.getAllByRole("pokemon-name");
// expect(pokeCards).toHaveLength(1);


//simple test to ensure our app is loading 
test('renders info message', () => {
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

//simple test to ensure our pokemon cards are rendering on ap load
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



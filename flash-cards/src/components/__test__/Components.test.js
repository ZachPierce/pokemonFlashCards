import {render, screen} from '@testing-library/react';
import PokemonQuizCard from '../PokemonQuizCard';
import PokemonDetailCard from '../PokemonDetailCard';
import InfoPanel from '../InfoPanel';

//testing that our components are rendering properly with the buttons that allow you to 
//to take action
test('Testing that the two buttons on the quiz card render', async () => {
    render(<PokemonQuizCard />);
    const buttonCount = await screen.findAllByRole('button');
    expect(buttonCount).toHaveLength(2);
  });

test('Testing that the button on the detail card render', async () => {
  render(<PokemonDetailCard />);
  const buttonCount = await screen.findAllByRole('button');
  expect(buttonCount).toHaveLength(1);
});

test('Testing that the button on the info panel renders', async () => {
  render(<InfoPanel />);
  const buttonCount = await screen.findAllByRole('button');
  expect(buttonCount).toHaveLength(1);
});
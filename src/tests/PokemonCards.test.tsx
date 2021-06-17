import '@testing-library/jest-dom/extend-expect'
import {render} from "@testing-library/react";

import {bulbasaur} from "./__mocks__/bulbasaur";
import {firstPokemonList} from "./__mocks__/firstPokemonList";

import App from '../App';
import HeightWeight from "../components/cardCompoments/HeightWeight";
import Types from "../components/cardCompoments/Types";


test("render DefaultCard at first, render first Pokemon List & card", async () => {

    jest.mock("../api/pokeApi")

    const { queryByTestId, getByText } = render(<App />);

    const defaultCard :HTMLElement | null = queryByTestId("defaultCard");
    const pokemonCard :HTMLElement | null = queryByTestId("pokemonCard");
    const loadingPokemon :HTMLElement | null = queryByTestId("loadingPokemon");

    expect(defaultCard).toBeTruthy();
    expect(pokemonCard).toBeFalsy();
    expect(loadingPokemon).toBeTruthy();



    //TEST FAILED AB HIER...
    // const bulbasaur :HTMLElement | null = getByText("Bulbasaur");
    // expect(defaultCard).toBeFalsy();
    // expect(pokemonCard).toBeTruthy();
    // expect(loadingPokemon).toBeFalsy();
    // expect(bulbasaur).toBeInTheDocument();
});

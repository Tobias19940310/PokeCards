import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor} from "@testing-library/react";

import {bulbasaur} from "./mocks/bulbasaur";
import {firstPokemonList} from "./mocks/firstPokemonList";

import App from '../App';
import PokemonCard from '../components/PokemonCard';
import HeightWeight from "../components/cardCompoments/HeightWeight";
import Types from "../components/cardCompoments/Types";


test("render DefaultCard at first, render first Pokemon List & ch", async () => {

    const getAllPokemon = jest.fn().mockResolvedValue(firstPokemonList);

    const { queryByTestId, getByText } = render(<App />);

    const defaultCard :HTMLElement | null = queryByTestId("defaultCard");
    const pokemonCard :HTMLElement | null = queryByTestId("pokemonCard");
    const loadingPokemon :HTMLElement | null = queryByTestId("loadingPokemon");

    expect(defaultCard).toBeTruthy();
    expect(pokemonCard).toBeFalsy();
    expect(loadingPokemon).toBeTruthy();

    await getAllPokemon();
    expect(getAllPokemon).toHaveBeenCalledTimes(1);

    //TEST FAILED AB HIER...
    const bulbasaur :HTMLElement | null = getByText("Bulbasaur");
    expect(defaultCard).toBeFalsy();
    expect(pokemonCard).toBeTruthy();
    expect(loadingPokemon).toBeFalsy();
    expect(bulbasaur).toBeInTheDocument();
});


test("check if types gets passed to card element", () => {
    const { getByText } = render(<Types types={bulbasaur.types} />)
    const type1 :HTMLElement | null = getByText("Grass");
    const type2 :HTMLElement | null = getByText("Poison");
    expect(type1).toBeInTheDocument();
    expect(type2).toBeInTheDocument();
})

test("check if height & weight gets passed to card element", () => {
    const { getByText } = render(<HeightWeight height={7} weight={69} />)
    const height :HTMLElement | null = getByText("Height: 0.70m");
    const weight :HTMLElement | null = getByText("Weight: 6.90kg");
    expect(height).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
})
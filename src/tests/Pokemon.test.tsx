import '@testing-library/jest-dom/extend-expect'
import {render, waitFor,} from "@testing-library/react";
import ReactDOM from 'react-dom';
import TestUtils, { act } from 'react-dom/test-utils';

import Content from '../components/Content';
import { bulbasaur } from './__mocks__/bulbasaur';

let container :HTMLElement | null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container!);
    container = null;
});


test("render DefaultCard at first, render first Pokemon List", async () => {

    jest.mock("../api/pokeApi")

    function sleep(period:number) {
        return new Promise(resolve => setTimeout(resolve, period));
    }

    act(() => {
        ReactDOM.render(<Content />, container);
    })

    const defaultCard :HTMLElement | null = container!.querySelector("#defaultCard");
    const pokemonCard :HTMLElement | null = container!.querySelector("#pokemonCard");
    const loadingPokemon :HTMLElement | null = container!.querySelector("#loadingPokemon");

    expect(defaultCard).toBeTruthy();
    expect(pokemonCard).toBeFalsy();
    expect(loadingPokemon).toBeTruthy();

    await act(async () => {
        await sleep(500); 
    });
    const bulbasaur :HTMLDivElement | undefined = Array.from(document.querySelectorAll("div")).find((el:HTMLElement) => el.textContent === "Bulbasaur");
    expect(defaultCard).toBeTruthy();
    expect(bulbasaur).toBeInTheDocument();
    expect(loadingPokemon).not.toBeInTheDocument();
});




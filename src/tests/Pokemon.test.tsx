import '@testing-library/jest-dom/extend-expect'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import renderer from 'react-test-renderer';

import Content from '../components/Content';
import PokemonCard from '../components/PokemonCard';

let container :HTMLElement | null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container!);
    container = null;
});


test("render DefaultCard at first, render first Pokemon List, click on first Pokemon to change PokemonCard", async () => {

    jest.mock("../api/pokeApi")
    window.scrollTo = jest.fn();

    function sleep(period:number) {
        return new Promise(resolve => setTimeout(resolve, period));
    }

    act(() => {
        ReactDOM.render(<Content />, container);
    })

    let defaultCard :HTMLElement | null = container!.querySelector("#defaultCard");
    let pokemonCard :HTMLElement | null = container!.querySelector("#pokemonCard");
    const loadingPokemon :HTMLElement | null = container!.querySelector("#loadingPokemon");

    expect(defaultCard).toBeTruthy();
    expect(pokemonCard).toBeFalsy();
    expect(loadingPokemon).toBeTruthy();

    //WARTEN AUF ERHALT DER POKEMONLISTE
    await act(async () => {
        await sleep(500); 
    });
    let bulbasaur :HTMLDivElement | undefined = Array.from(document.querySelectorAll("div")).find((el:HTMLElement) => el.textContent === "Bulbasaur");
    expect(bulbasaur).toBeInTheDocument();
    expect(loadingPokemon).not.toBeInTheDocument();

    //KLICK AUF BULBASAUR UND ÄNDERN DER POKEMONKARTEN
    bulbasaur?.dispatchEvent(new MouseEvent("click", {bubbles:true}))
    await act(async () => {
        await sleep(500); 
    });
    defaultCard = container!.querySelector("#defaultCard");
    pokemonCard = container!.querySelector("#pokemonCard");
    expect(pokemonCard).toBeTruthy();
    expect(defaultCard).toBeFalsy();
    let pokemonName :string | null | undefined = pokemonCard!.querySelector("h5")?.textContent;
    expect(pokemonName).toBe("#1 - Bulbasaur");
});


test("pokemonCardBulbasaur Snapshot", async () => {

    const tree = renderer
    .create(<PokemonCard />)
    .toJSON();
    expect(tree).toMatchSnapshot();
    
})



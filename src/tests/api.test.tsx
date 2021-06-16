import { getAllPokemon, getSinglePokemon, getEvolutions } from "../api/pokeApi";
import { bulbasaur } from "./__mocks__/bulbasaur";
import { bulbasaurEvolutions } from "./__mocks__/bulbasaurEvolutions";
import { firstPokemonList } from "./__mocks__/firstPokemonList";

//HAT SICH DIE API RESPONSE VERÄNDERT?

test("getAllPokemon", () => {
    expect(getAllPokemon(0, 60)).toBe(firstPokemonList)
})

test("getSinglePokemon", () => {
    expect(getSinglePokemon("https://pokeapi.co/api/v2/pokemon/1")).toBe(bulbasaur)
})

test("getEvolutions", () => {
    expect(getEvolutions("https://pokeapi.co/api/v2/pokemon/1")).toBe(bulbasaurEvolutions)
})
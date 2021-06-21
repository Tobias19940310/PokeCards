import { getAllPokemon, getSinglePokemon, getEvolutions } from "../api/pokeApi";
import { IEvolutions } from "../data/InterfacesEvolutions";
import { IAllPokemon, ISinglePokemon } from "../data/InterfacesPokemon";
import { bulbasaur } from "./__mocks__/bulbasaur";
import { bulbasaurEvolutions } from "./__mocks__/bulbasaurEvolutions";
import { firstPokemonList } from "./__mocks__/firstPokemonList";

//HAT SICH DIE API RESPONSE VERÄNDERT?

test("getAllPokemon", async () => {
    return getAllPokemon(0,60)
    .then((data:IAllPokemon | undefined)=>{
        expect(data).toStrictEqual(firstPokemonList)
    }) 
})

test("getSinglePokemon", async () => {
    return getSinglePokemon("https://pokeapi.co/api/v2/pokemon/1")
    .then((data:ISinglePokemon | undefined)=>{
        expect(data).toStrictEqual(bulbasaur)
    }) 
})

test("getEvolutionsWithImages", async () => {
    return getEvolutions("https://pokeapi.co/api/v2/pokemon-species/1/")
    .then((data:IEvolutions | undefined)=>{
        expect(data).toStrictEqual(bulbasaurEvolutions)
    }) 
}) 


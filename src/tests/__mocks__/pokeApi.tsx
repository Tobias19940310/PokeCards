import { IAllPokemon } from "../../data/InterfacesPokemon";
import { firstPokemonList } from "./firstPokemonList";

export const getAllPokemon = (offset:number, perPageLimit:number) :IAllPokemon => {
    return firstPokemonList;
}

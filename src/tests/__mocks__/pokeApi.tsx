import { IChain, IEvolutions } from "../../data/InterfacesEvolutions";
import { IAllPokemon, ISinglePokemon } from "../../data/InterfacesPokemon";
import { bulbasaur } from "./bulbasaur";
import { bulbasaurEvolutions } from "./bulbasaurEvolutions";
import { firstPokemonList } from "./firstPokemonList";

export const getAllPokemon = (offset:number, perPageLimit:number) :Promise<IAllPokemon> => {
    return new Promise((resolve) => resolve(firstPokemonList))
}

export const getSinglePokemon = (url:string) :Promise<ISinglePokemon> => {
    return new Promise((resolve) => resolve(bulbasaur))
}

export const getEvolutions = (url: string) :Promise<any> => {
    return new Promise((resolve) => resolve(bulbasaurEvolutions))
}

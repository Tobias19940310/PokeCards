import { createState } from '@hookstate/core';
import { IAllPokemon, ISinglePokemon } from './data/InterfacesPokemon';
import { baseAllPokemon, baseSinglePokemon } from './data/baseItems';

export const allPokemonState = createState<IAllPokemon>(baseAllPokemon);
export const singlePokemonState = createState<ISinglePokemon>(baseSinglePokemon);

export const perPageLimitState = createState<number>(60);
export const accordionExpandedState = createState<string | boolean>(false);
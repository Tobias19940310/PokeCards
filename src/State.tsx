import { createState } from '@hookstate/core';
import { IAllPokemon, IAllPokemonSingle, ISinglePokemon } from './data/InterfacesPokemon';
import { baseAllPokemon, baseSinglePokemon } from './data/baseItems';

export const allPokemonState = createState<IAllPokemon>(baseAllPokemon);
export const singlePokemonState = createState<ISinglePokemon>(baseSinglePokemon);

export const evolutionsState = createState<Array<IAllPokemonSingle>>([])

export const perPageLimitState = createState<number>(60);
export const accordionExpandedState = createState<string | boolean>(false);

export const dialogOpenState = createState<boolean>(false);
export const alertTextState = createState<string>("");
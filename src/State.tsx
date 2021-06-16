import React from 'react';
import { createState } from '@hookstate/core';
import { IAllPokemon } from './data/InterfacesPokemon';
import { baseAllPokemon } from './data/baseItems';

export const allPokemonState = createState<IAllPokemon>(baseAllPokemon);
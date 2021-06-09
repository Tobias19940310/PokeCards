import {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";

import NavBar from "./components/NavBar";
import Content from "./components/Content";

import {baseAllPokemon} from "./data/baseItems";
import {baseSinglePokemon} from "./data/baseItems";
import {IAllPokemon, ISinglePokemon} from "./data/InterfacesPokemon";
import {getAllPokemon, getSinglePokemon} from "./api/pokeApi";


function App() {

  const [allPokemon, setAllPokemon] = useState<IAllPokemon>(baseAllPokemon);
  const [singlePokemon, setSinglePokemon] = useState<ISinglePokemon>(baseSinglePokemon);
  const perPageLimit :number = 60;

  useEffect(() => {
    retrieveAllPokemon(0);
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //PASS OFFSET (AT WHICH ID DOES THE PAGE START)
  const retrieveAllPokemon = (offset:number) :void => {
    const url :string = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${perPageLimit}`
    getAllPokemon(url)
    .then((response :IAllPokemon) => {
      setAllPokemon(response);
    })
  }

  //PASS URL OF SINGLE POKEMON
  const retrieveSinglePokemon = (url:string) :void => {
    getSinglePokemon(url)
    .then((response :ISinglePokemon) => {
      setSinglePokemon(response);
    })
  }

  return (
    <Container id="App" maxWidth={false} data-testid="App">
      <NavBar />
      <Content 
        allPokemon={allPokemon} retrieveAllPokemon={retrieveAllPokemon} 
        perPageLimit={perPageLimit} 
        singlePokemon={singlePokemon} retrieveSinglePokemon={retrieveSinglePokemon}
        />
    </Container>
  );
}

export default App;



import { IEvolutions, ISpecies } from "../data/InterfacesEvolutions";
import { IAllPokemon, ISinglePokemon } from "../data/InterfacesPokemon";

export const getAllPokemon = async (offset:number, perPageLimit:number) :Promise<IAllPokemon> => {
    const url :string = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${perPageLimit}`
    const response :any = await fetch(url)
    .catch((error) => console.error("error " + error));
    const body :IAllPokemon = await response.json();
    return body;
}

export const getSinglePokemon = async (url: string) :Promise<ISinglePokemon> => {
    const response :any = await fetch(url)
    .catch((error) => console.error("error " + error));
    const body :ISinglePokemon = await response.json();
    return body;
}

//FRAGE: Was für ein Type sind fetch responses???

//PASS API-URL TO SPECIES
export const getEvolutions = async (url: string) :Promise<IEvolutions> => {
    //GET SPECIES FOR EVOLUTION CHANGE
    const responseSpecies :any = await fetch(url)
    .catch((error) => console.error("error " + error));
    const bodySpecies :ISpecies = await responseSpecies.json();

    //GET EVOLUTIONCHAIN
    const urlEvolution :string = bodySpecies.evolution_chain.url;
    const responseEvolution :any = await fetch(urlEvolution)
    .catch((error) => console.error("error " + error))
    const bodyEvolution :IEvolutions = await responseEvolution.json();

    let evolutionWithImages :IEvolutions = {...bodyEvolution};
    if(evolutionWithImages.chain.evolves_to.length !== 0){
        //1. ENTWICKLUNG
        const responseEvo1 :any = await (fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionWithImages.chain.species.name}`))
        const bodyEvo1 :ISinglePokemon = await responseEvo1.json();
        evolutionWithImages.chain.species.image = bodyEvo1.sprites.front_default;
        
        //2. ENTWICKLUNG
        const responseEvo2 :any = await (fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionWithImages.chain.evolves_to[0].species.name}`))
        const bodyEvo2 :ISinglePokemon = await responseEvo2.json();
        evolutionWithImages.chain.evolves_to[0].species.image = bodyEvo2.sprites.front_default;

        //WENN 3. ENTWICKLUNG VORHANDEN
        if(evolutionWithImages.chain.evolves_to[0].evolves_to.length !== 0) {
            //3. ENTWICKLUNG
            const responseEvo3 :any = await (fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionWithImages.chain.evolves_to[0].evolves_to[0].species.name}`))
            const bodyEvo3 :ISinglePokemon = await responseEvo3.json();
            evolutionWithImages.chain.evolves_to[0].evolves_to[0].species.image = bodyEvo3.sprites.front_default;
        }
    }
    return evolutionWithImages;
}


import { IEvolutions, ISpeciesBody } from "../data/InterfacesEvolutions";
import { IAllPokemon, ISinglePokemon } from "../data/InterfacesPokemon";

export const getAllPokemon = async (offset:number, perPageLimit:number) :Promise<IAllPokemon | undefined> => {
    const url :string = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${perPageLimit}`
    const response :any = await fetch(url)
    .catch((error) => console.error("error " + error));
    if(response !== undefined) {
        const body :IAllPokemon = await response.json();
        return body;
    } else return undefined;
    
}

export const getSinglePokemon = async (url: string) :Promise<ISinglePokemon | undefined> => {
    const response :any = await fetch(url)
    .catch((error) => console.error("error " + error));
    if(response !== undefined) {
        const body :ISinglePokemon = await response.json();
        return body;
    } else return undefined;
}

//PASS API-URL TO SPECIES
export const getEvolutions = async (url: string) :Promise<IEvolutions | undefined> => {
    //GET SPECIES FOR EVOLUTION CHANGE
    const responseSpecies :any = await fetch(url)
    .catch((error) => console.error("error " + error));
    if(responseSpecies === undefined) return undefined;
    else {
        const bodySpecies :ISpeciesBody = await responseSpecies.json();

        //GET EVOLUTIONCHAIN
        const urlEvolution :string = bodySpecies.evolution_chain.url;
        const responseEvolution :any = await fetch(urlEvolution)
        .catch((error) => console.error("error " + error))
        if(responseEvolution === undefined) return undefined;
        else {
            const bodyEvolution :IEvolutions = await responseEvolution.json();

            let evolutionWithImages :IEvolutions = {...bodyEvolution};
            if(evolutionWithImages.chain.evolves_to.length !== 0){
                //1. ENTWICKLUNG
                const responseEvo1 :any = await (fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionWithImages.chain.species.name}`))
                if(responseEvo1 !== undefined) {
                    const bodyEvo1 :ISinglePokemon = await responseEvo1.json();
                    evolutionWithImages.chain.species.image = bodyEvo1.sprites.front_default;
                }
                
                
                //WENN 2. ENTWICKLUNG VORHANDEN
                if(evolutionWithImages.chain.evolves_to.length >= 1){
                    for (let i = 0; i < evolutionWithImages.chain.evolves_to.length; i++){
                        const responseEvo2 :any = await (fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionWithImages.chain.evolves_to[i].species.name}`))
                        if(responseEvo2 !== undefined) {
                            const bodyEvo2 :ISinglePokemon = await responseEvo2.json();
                            evolutionWithImages.chain.evolves_to[i].species.image = bodyEvo2.sprites.front_default;
                        }
                    }    
                }

                // WENN 3. ENTWICKLUNGEN VORHANDEN
                if(evolutionWithImages.chain.evolves_to[0].evolves_to.length >= 1){
                    for (let i = 0; i < evolutionWithImages.chain.evolves_to[0].evolves_to.length; i++){
                        const responseEvo2 :any = await (fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionWithImages.chain.evolves_to[0].evolves_to[i].species.name}`))
                        if(responseEvo1 !== undefined) {
                            const bodyEvo2 :ISinglePokemon = await responseEvo2.json();
                            evolutionWithImages.chain.evolves_to[0].evolves_to[i].species.image = bodyEvo2.sprites.front_default;
                        }
                    }    
                }
            }
            return evolutionWithImages;
        }
        
    }
    
}

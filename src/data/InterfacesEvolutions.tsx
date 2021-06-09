export interface ISpecies {
    evolution_chain: IUrl;
}

export interface IUrl {
    url:string;
}

export interface IEvolutions {
    chain: IChain
}

export interface IChain {
    species: ISpecies,
    evolves_to: evolvesTo[]
}

export interface ISpecies {
    name: string,
    url: string,
    image: string
}

export interface evolvesTo{
    species: ISpecies,
    evolves_to: evolvesTo[]
}

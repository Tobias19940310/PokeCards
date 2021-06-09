export interface IAllPokemonSingle {
    name:string,
    url: string,
    image?:string
}

export interface IAllPokemon {
    count:number,
    next: string,
    previous: string,
    results: Array<IAllPokemonSingle>
}

export interface ISinglePokemon {
    abilities:                 IAbility[];
    height:                    number;
    id:                        number;
    moves:                     IMove[];
    name:                      string;
    species:                   ISpecies;
    sprites:                   ISprites;
    stats:                     IStat[];
    types:                     IType[];
    weight:                    number;
}

export interface IAbility {
    ability:   ISpecies;
}
export interface ISpecies {
    name: string;
    url:  string;
    image?: string
}
export interface IMove {
    move:       ISpecies;
}
export interface ISprites {
    front_default:       string;
}
export interface IStat {
    base_stat: number;
    stat:      ISpecies;
}
export interface IType {
    type: ISpecies;
}




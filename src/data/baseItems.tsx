import {IAllPokemon, ISinglePokemon} from "./InterfacesPokemon";

export const baseAllPokemon :IAllPokemon = {"count":0, next:"", previous:"", results:[] };

export const baseSinglePokemon: ISinglePokemon = {
    name: "",
    id:0,
    height:0,
    weight:0,
    sprites: {front_default:""},
    types:[{type:{name:"", url:""}}],
    stats:[{base_stat:0, stat:{name:"", url:""}} ],
    abilities:[{ability:{name:"", url:""}}],
    moves:[{move:{name:"", url:""}}],
    species:{name:"", url:""}
}


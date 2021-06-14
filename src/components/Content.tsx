import React, {useState, useEffect, createContext} from "react";

import {CircularProgress, Divider, Grid, Hidden, makeStyles} from "@material-ui/core";

import PokemonList from "./PokemonList";
import PokemonCard from './PokemonCard';

import {baseAllPokemon} from "../data/baseItems";
import {baseSinglePokemon} from "../data/baseItems";
import {IAllPokemon, ISinglePokemon} from "../data/InterfacesPokemon";
import {getAllPokemon, getSinglePokemon} from "../api/pokeApi";

const useStyles = makeStyles((theme) => ({
    container:{
        marginTop:"100px",
    },
    center:{
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        '& > :first-of-type':{
            margin: theme.spacing(0,0,2,0),
        },
    },
    divider:{
        backgroundColor:"firebrick"
    },
    spinner:{
        paddingTop:"200px",
        filter:"grayscale(100%) opacity(50%)"
    }
}))

const AllPokemonContext :React.Context<IAllPokemon> = createContext(baseAllPokemon);

function Content(){

    const classes = useStyles();

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
            if(response !== undefined) setAllPokemon(response);
        })
    }

    //PASS URL OF SINGLE POKEMON
    const retrieveSinglePokemon = (url:string) :void => {
        getSinglePokemon(url)
        .then((response :ISinglePokemon) => {
            if(response !== undefined) setSinglePokemon(response);
        })
    }

    return (
        <Grid container wrap="wrap" className={classes.container}>
            <Grid item xs={12} sm={5} md={4} className={classes.center}>
                <PokemonCard singlePokemon={singlePokemon} retrieveSinglePokemon={retrieveSinglePokemon}/>
            </Grid>

            <Hidden xsDown>
                <Divider orientation="vertical" variant="middle" flexItem className={classes.divider}/>
            </Hidden>
            
            <Grid item xs={12} sm={6} md={7} className={classes.center}>
                {allPokemon.count === 0 ? 
                    <CircularProgress className={classes.spinner} data-testid="loadingPokemon" />
                : 
                    <PokemonList 
                        allPokemon={allPokemon} retrieveAllPokemon={retrieveAllPokemon} 
                        perPageLimit={perPageLimit}
                        singlePokemon={singlePokemon} retrieveSinglePokemon={retrieveSinglePokemon}
                    />}
            </Grid>
        </Grid>
    )
}

export default Content

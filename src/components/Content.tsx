import React from "react";

import {CircularProgress, Divider, Grid, Hidden, makeStyles} from "@material-ui/core";

import PokemonList from "./PokemonList";
import PokemonCard from './PokemonCard';

import { allPokemonState } from "../State";
import { useState } from "@hookstate/core";

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
        alignSelf:"center",
        filter:"grayscale(100%) opacity(50%)"
    }
}))

function Content(){

    const classes = useStyles();
    const allPokemon = useState<IAllPokemon>(allPokemonState);
    // const [allPokemon, setAllPokemon] = useState<IAllPokemon>(baseAllPokemon);
    const [singlePokemon, setSinglePokemon] = React.useState<ISinglePokemon>(baseSinglePokemon);
    const perPageLimit :number = 60;

    React.useEffect(() => {
        getAllPokemon(0, perPageLimit)
        .then((response:IAllPokemon) => allPokemon.set(response))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
                {allPokemon.get().count === 0 ? 
                    <CircularProgress className={classes.spinner} data-testid="loadingPokemon" />
                : 
                    <PokemonList 
                        perPageLimit={perPageLimit}
                        retrieveSinglePokemon={retrieveSinglePokemon}
                    />}
            </Grid>
        </Grid>
    )
}

export default Content

import {useEffect} from "react";
import {CircularProgress, Divider, Grid, Hidden, makeStyles} from "@material-ui/core";

import fullText from "../data/text.json";

import PokemonList from "./PokemonList";
import PokemonCard from './PokemonCard';

import { alertTextState, allPokemonState, dialogOpenState, perPageLimitState } from "../State";
import { useState } from "@hookstate/core";

import {IAllPokemon} from "../data/InterfacesPokemon";
import {getAllPokemon} from "../api/pokeApi";


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
    const perPageLimit = useState<number>(perPageLimitState)
    const dialogOpen = useState<boolean>(dialogOpenState);
    const alertText = useState<string>(alertTextState);

    useEffect(() => {
        getAllPokemon(0, perPageLimit.get())
        .then((response:IAllPokemon | undefined) => {
            if(response!== undefined) allPokemon.set(response);
            else { alertText.set(fullText.alert.err); dialogOpen.set(true);  }
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Grid container wrap="wrap" className={classes.container}>
            <Grid item xs={12} sm={5} md={4} className={classes.center}>
                <PokemonCard />
            </Grid>

            <Hidden xsDown>
                <Divider orientation="vertical" variant="middle" flexItem className={classes.divider}/>
            </Hidden>
            
            <Grid item xs={12} sm={6} md={7} className={classes.center}>
                {allPokemon.get().count === 0 ? 
                    <CircularProgress className={classes.spinner} id="loadingPokemon" ata-testid="loadingPokemon" />
                : 
                    <PokemonList />}
            </Grid>
        </Grid>
    )
}

export default Content

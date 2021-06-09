import {CircularProgress, Divider, Grid, Hidden, makeStyles} from "@material-ui/core";
import { IAllPokemon, ISinglePokemon } from '../data/InterfacesPokemon'

import PokemonList from "./PokemonList";
import PokemonCard from './PokemonCard';

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

function Content( 
    {allPokemon, retrieveAllPokemon, perPageLimit, singlePokemon, retrieveSinglePokemon}
    :
    {
    allPokemon:IAllPokemon, retrieveAllPokemon:(offset:number)=>void; perPageLimit:number, 
    singlePokemon:ISinglePokemon, retrieveSinglePokemon:(url:string)=>void;
    }){

    const classes = useStyles();

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

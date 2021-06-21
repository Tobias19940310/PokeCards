import { Card, CardContent, CardMedia, Divider, makeStyles, Typography} from "@material-ui/core";

import { ISinglePokemon } from '../data/InterfacesPokemon';

import { useState } from '@hookstate/core';
import { singlePokemonState } from '../State';

import HeightWeight from "./cardCompoments/HeightWeight";
import Types from "./cardCompoments/Types";
import Evolutions from "./cardCompoments/Evolutions";
import Stats from "./cardCompoments/Stats";
import Abilities from "./cardCompoments/Abilities";
import Moves from "./cardCompoments/Moves";

import {firstLetterUppercase} from "../helperFunctions/helperFunctions";

import fullText from "../data/text.json";
import pokedexImage from "../images/pokedex.png";


const useStyles = makeStyles((theme) => ({
    grow:{
        width:"100%",
        [theme.breakpoints.up("sm")]:{
            width:"90%"
        },
        [theme.breakpoints.up("lg")]:{
            width:"70%"
        },
        border: "10px solid gold",
        background: "linear-gradient(305deg, rgba(178,34,34,0.7) 0%, rgba(255,215,0,0.3) 50%, rgba(178,34,34,0.5) 100%)"
    },
    padding:{
        padding: theme.spacing(2,1)
    },
    media:{
        height:"120px",
        [theme.breakpoints.up("md")]:{
            height:"160px"
        },
        objectFit: "contain"
    },
    mediaPadding:{
        padding:theme.spacing(10,0),
        height:"120px",
        [theme.breakpoints.up("md")]:{
            height:"160px"
        },
        objectFit: "contain"
    },
    divider:{
        margin: theme.spacing(2,0),
        backgroundColor:"gold"
    }
}))

function PokemonCard(){

    const classes = useStyles();
    const text = fullText.card;
    const singlePokemon = useState<ISinglePokemon>(singlePokemonState);

    return (
        <Card className={classes.grow}>
            {singlePokemon.get().name === "" ? 
            //POKEDEX DEFAULT
            <CardContent id="defaultCard" data-testid="defaultCard">
                <CardMedia 
                    component ="img"
                    alt="Pokedex"
                    image={pokedexImage}
                    title="Pokedex" 
                    className={classes.mediaPadding} />
                <Divider className={classes.divider} />
                <Typography variant="h5" align="center" gutterBottom className={classes.padding}>{text.noCardHeader}</Typography>
                <Typography variant="body2" align="justify" className={classes.padding}>{text.noCardInfo}</Typography>
            </CardContent>
            :
            // POKEMONCARD
            <CardContent id="pokemonCard" test-id="pokemonCard">
                <CardMedia 
                    component ="img"
                    alt={"Pokemon Image " + singlePokemon.get().name}
                    image={singlePokemon.get().sprites.front_default}
                    title={"Pokemon Image " + singlePokemon.get().name}
                    className={classes.media} />

                <Divider className={classes.divider} />

                <Typography variant="h5" align="center" gutterBottom>
                    {/* Pokemon Nummer & Name */}
                    {`#${singlePokemon.get().id} - ${firstLetterUppercase(singlePokemon.get().name)}`}
                </Typography>
                <HeightWeight />
                <Types />
                <Evolutions />
                <Stats />
                <Abilities />
                <Moves />
            </CardContent>
            }
        </Card>
    )
}

export default PokemonCard

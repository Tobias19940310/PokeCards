import { useState } from 'react'
import { Card, CardContent, CardMedia, Divider, makeStyles, Typography} from "@material-ui/core";

import { ISinglePokemon } from '../data/InterfacesPokemon';

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

function PokemonCard(
    {singlePokemon, retrieveSinglePokemon} : 
    {singlePokemon :ISinglePokemon, retrieveSinglePokemon:(url:string)=>void;}
    ){

    const classes = useStyles();
    const text = fullText.card;

    const [expanded, setExpanded] = useState<string | boolean>(false);

    const handleChangeAccordion = (panel:string) => (event:React.ChangeEvent<{}>, newExpanded:boolean) :void => {
        setExpanded(newExpanded ? panel : false);
    }

    return (
        <Card className={classes.grow}>
            {singlePokemon.name === "" ? 
            //POKEDEX DEFAULT
            <CardContent data-testid="defaultCard">
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
            <CardContent test-id="pokemonCard">
                <CardMedia 
                    component ="img"
                    alt={"Pokemon Image " + singlePokemon.name}
                    image={singlePokemon.sprites.front_default}
                    title={"Pokemon Image " + singlePokemon.name}
                    className={classes.media} />

                <Divider className={classes.divider} />

                <Typography variant="h5" align="center" gutterBottom>{`#${singlePokemon.id} - ${firstLetterUppercase(singlePokemon.name)}`}</Typography>
                <HeightWeight height={singlePokemon.height} weight={singlePokemon.weight} />
                <Types types={singlePokemon.types} />
                <Evolutions 
                    evolutionUrl={singlePokemon.species.url} retrieveSinglePokemon={retrieveSinglePokemon}
                    expanded={expanded} handleChangeAccordion={handleChangeAccordion}
                    />
                <Stats stats={singlePokemon.stats} expanded={expanded} handleChangeAccordion={handleChangeAccordion} />
                <Abilities abilities={singlePokemon.abilities} expanded={expanded} handleChangeAccordion={handleChangeAccordion} />
                <Moves moves={singlePokemon.moves} expanded={expanded} handleChangeAccordion={handleChangeAccordion} />
            </CardContent>
            }
        </Card>
    )
}

export default PokemonCard

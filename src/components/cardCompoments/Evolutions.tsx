import React, { useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Avatar, Box, Chip, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import fullText from "../../data/text.json";

import { IAllPokemonSingle, ISinglePokemon } from "../../data/InterfacesPokemon";
import { IChain, IEvolutions } from "../../data/InterfacesEvolutions";

import { getEvolutions, getSinglePokemon } from "../../api/pokeApi";
import { firstLetterUppercase } from "../../helperFunctions/helperFunctions";
import { useState } from "@hookstate/core";
import { accordionExpandedState, alertTextState, dialogOpenState, evolutionsState, singlePokemonState } from "../../State";


const useStyles = makeStyles((theme) => ({
    full:{
        width:"100%"
    },
    chipColor:{
        margin: theme.spacing(0.5,0.5),
        width: "60%",
        [theme.breakpoints.up("md")]:{
            fontSize:"100%",
        },
    },
    firstAccordion:{
        marginTop:"10px"
    },
    accordionDetails: {
        display:"flex",
        justifyContent:"center",
        marginTop:"-10px"
    }
}))

function Evolutions() {

    const classes = useStyles();
    const singlePokemon = useState<ISinglePokemon>(singlePokemonState);
    const evolutions = useState<Array<IAllPokemonSingle>>(evolutionsState)
    const evolutionUrl = singlePokemon.get().species.url;
    const accordionExpanded = useState<string | boolean>(accordionExpandedState)
    const dialogOpen = useState<boolean>(dialogOpenState);
    const alertText = useState<string>(alertTextState);

    useEffect(() => {
        if(evolutionUrl !== ""){
            retrieveEvolutions(evolutionUrl);
        }
    }, [evolutionUrl]) // eslint-disable-line react-hooks/exhaustive-deps

    const retrieveEvolutions = (url:string) :void => {
        getEvolutions(url)
        .then((response :IEvolutions | undefined) => {
            if(response !== undefined) {
                let tempEvolutions :Array<IAllPokemonSingle> = [];
                //WENN EINE ENTWICKLUNG VORHANGEN
                if(response.chain.evolves_to.length !== 0){
                    //1. ENTWICKLUNG
                    const tempEvo1 :IAllPokemonSingle = {
                        name: response.chain.species.name,
                        image: response.chain.species.image,
                        url: response.chain.species.url
                    }
                    tempEvolutions.push(tempEvo1);
                    
                    //2. ENTWICKLUNG
                    if(response.chain.evolves_to.length >= 1){
                        response.chain.evolves_to.forEach((evolution :IChain, i:number)=> {
                            const tempEvo2 :IAllPokemonSingle = {
                                name: response.chain.evolves_to[i].species.name,
                                image: response.chain.evolves_to[i].species.image,
                                url: response.chain.evolves_to[i].species.url
                            }
                            tempEvolutions.push(tempEvo2);
                        });
                    }

                    //WENN 3.. ENTWICKLUNG VORHANDEN
                    if(response.chain.evolves_to[0].evolves_to.length >= 1){
                        response.chain.evolves_to[0].evolves_to.forEach((evolution :IChain, i:number)=> {
                            const tempEvo2 :IAllPokemonSingle = {
                                name: response.chain.evolves_to[0].evolves_to[i].species.name,
                                image: response.chain.evolves_to[0].evolves_to[i].species.image,
                                url: response.chain.evolves_to[0].evolves_to[i].species.url
                            }
                            tempEvolutions.push(tempEvo2);
                        });
                    }
                }
                evolutions.set(tempEvolutions);    
            } else { alertText.set(fullText.alert.err); dialogOpen.set(true); }
        })
    }

    const selectPokemonFromEvolution = (event : React.MouseEvent) :void => {
        const element :HTMLElement = event.target as HTMLElement;
        const url = "https://pokeapi.co/api/v2/pokemon/"+element.innerText.toLowerCase();
        getSinglePokemon(url)
            .then((response:ISinglePokemon | undefined) => {
                if(response!== undefined) singlePokemon.set(response);
                else { alertText.set(fullText.alert.err); dialogOpen.set(true); }
            })
    }

    return (
        <Accordion  expanded={accordionExpanded.get() === "panel1"} onChange={()=>accordionExpanded.set(accordionExpanded.get()==="panel1"?false:"panel1")} className={classes.firstAccordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography align="center" variant="subtitle1">Evolutions:</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <Box display="flex" flexDirection="column" flexWrap="wrap" alignItems="center" className={classes.full}>
                    {evolutions.length === 0 ?
                    <Typography align="center" variant="body1">-- No Evolutions --</Typography> :
                        evolutions.get().map((element:IAllPokemonSingle)=>(
                            <Chip key={element.name} label={firstLetterUppercase(element.name)} className={classes.chipColor}
                            avatar={<Avatar alt={"Image " + element.name} src={element.image} />}
                            clickable onClick={selectPokemonFromEvolution}
                            />
                        ))
                    }
                </Box>
            </AccordionDetails>
    </Accordion>
    )
}

export default Evolutions

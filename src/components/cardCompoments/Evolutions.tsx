import { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Avatar, Box, Chip, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { IAllPokemonSingle } from "../../data/InterfacesPokemon";
import { IEvolutions } from "../../data/InterfacesEvolutions";

import { getEvolutions } from "../../api/pokeApi";
import { firstLetterUppercase } from "../../helperFunctions/helperFunctions";


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

function Evolutions( 
    { evolutionUrl, retrieveSinglePokemon, expanded, handleChangeAccordion } 
    :
    { evolutionUrl:string, retrieveSinglePokemon:(url:string)=>void; 
    expanded:string | boolean, handleChangeAccordion:(panel:string) => (event:React.ChangeEvent<{}>, newExpanded:boolean) => void}
    ) {

    const classes = useStyles();

    const [evolutions, setEvolutions] = useState<Array<IAllPokemonSingle>>([]);

    useEffect(() => {
        if(evolutionUrl !== ""){
            retrieveEvolutions(evolutionUrl);
        }
    }, [evolutionUrl])

    const retrieveEvolutions = (url:string) :void => {
        getEvolutions(url)
        .then((response :IEvolutions) => {
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
                    const tempEvo2 :IAllPokemonSingle = {
                        name: response.chain.evolves_to[0].species.name,
                        image: response.chain.evolves_to[0].species.image,
                        url: response.chain.evolves_to[0].species.url
                    }
                    tempEvolutions.push(tempEvo2);
                    //WENN 3. ENTWICKLUNG VORHANDEN
                    if(response.chain.evolves_to[0].evolves_to.length !== 0) {
                        //3. ENTWICKLUNG
                        const tempEvo3 :IAllPokemonSingle = {
                            name: response.chain.evolves_to[0].evolves_to[0].species.name,
                            image: response.chain.evolves_to[0].evolves_to[0].species.image,
                            url: response.chain.evolves_to[0].evolves_to[0].species.url
                        }
                        tempEvolutions.push(tempEvo3);
                    }
                }
                setEvolutions(tempEvolutions);    
            }
        })
    }

    const selectPokemonFromEvolution = (event : React.MouseEvent) :void => {
        const element :HTMLElement = event.target as HTMLElement;
        const url = "https://pokeapi.co/api/v2/pokemon/"+element.innerText.toLowerCase();
        retrieveSinglePokemon(url);
    }

    return (
        <Accordion  expanded={expanded === "panel1"} onChange={handleChangeAccordion("panel1")} className={classes.firstAccordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography align="center" variant="subtitle1">Evolutions:</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <Box display="flex" flexDirection="column" flexWrap="wrap" alignItems="center" className={classes.full}>
                    {evolutions.length === 0 ?
                    <Typography align="center" variant="body1">-- No Evolutions --</Typography> :
                        evolutions.map((element:IAllPokemonSingle)=>(
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

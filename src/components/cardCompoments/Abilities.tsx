import { Accordion, AccordionSummary, AccordionDetails, Box, Chip, makeStyles, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useState } from "@hookstate/core";
import { IAbility, ISinglePokemon } from "../../data/InterfacesPokemon";
import { accordionExpandedState, singlePokemonState } from "../../State";

import { firstLetterUppercase } from "../../helperFunctions/helperFunctions";

const useStyles = makeStyles((theme) => ({
    chipOutlineSmall:{
        margin:theme.spacing(0.25,0.25),
        backgroundColor:"white",
        border: "1px solid lightgrey"
    },
    accordionDetails: {
        display:"flex",
        justifyContent:"center",
        marginTop:"-10px"
    }
}))


function Abilities(){

    const classes = useStyles();
    const singlePokemon = useState<ISinglePokemon>(singlePokemonState);
    const abilities :Array<IAbility> = singlePokemon.get().abilities;
    const accordionExpanded = useState<string | boolean>(accordionExpandedState)

    return (
        <Accordion expanded={accordionExpanded.get() === "panel3"} onChange={()=>accordionExpanded.set("panel3")}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography align="center" variant="subtitle1">Abilities:</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" >
                    {abilities.map((element:IAbility) => (
                        <Chip key={element.ability.name} label={firstLetterUppercase(element.ability.name)} className={classes.chipOutlineSmall} size="small"/>
                    ))}
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

export default Abilities

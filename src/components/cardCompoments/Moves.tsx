import { Accordion, AccordionSummary, AccordionDetails, Box, Chip, makeStyles, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useState } from "@hookstate/core";
import { IMove, ISinglePokemon } from "../../data/InterfacesPokemon";
import { accordionExpandedState, singlePokemonState } from "../../State";

import {firstLetterUppercase} from "../../helperFunctions/helperFunctions";

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
    },
    scrollBox: {
        maxHeight:"200px",
        overflowY: "scroll"
    }
}))

function Moves(){

    const classes = useStyles();
    const singlePokemon = useState<ISinglePokemon>(singlePokemonState);
    const moves :Array<IMove> = singlePokemon.get().moves;
    const accordionExpanded = useState<string | boolean>(accordionExpandedState)

    return (
        <Accordion expanded={accordionExpanded.get() === "panel4"} onChange={()=>accordionExpanded.set(accordionExpanded.get()==="panel4"?false:"panel4")}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography align="center" variant="subtitle1">Moves:</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" className={classes.scrollBox}>
                    {moves.map((element:IMove) => (
                        <Chip key={element.move.name} label={firstLetterUppercase(element.move.name)} className={classes.chipOutlineSmall} size="small"/>
                    ))}
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

export default Moves

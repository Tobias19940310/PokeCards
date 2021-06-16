import { Accordion, AccordionSummary, AccordionDetails, makeStyles, Table, TableBody, TableRow, TableCell, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useState } from "@hookstate/core";
import { IStat, ISinglePokemon } from "../../data/InterfacesPokemon";
import { accordionExpandedState, singlePokemonState } from "../../State";

import { firstLetterUppercase } from "../../helperFunctions/helperFunctions";

const useStyles = makeStyles((theme) => ({
    accordionDetails: {
        display:"flex",
        justifyContent:"center",
        marginTop:"-10px"
    }
}))


function Stats(){

    const classes = useStyles();
    const singlePokemon = useState<ISinglePokemon>(singlePokemonState);
    const stats :Array<IStat> = singlePokemon.get().stats;
    const accordionExpanded = useState<string | boolean>(accordionExpandedState)

    return (
        <Accordion expanded={accordionExpanded.get() === "panel2"} onChange={()=>accordionExpanded.set("panel2")}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography align="center" variant="subtitle1">Stats:</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <Table size="small">
                    <TableBody>
                        {stats.map((element:IStat, i:number)=>(
                            <TableRow key={"tableRow "+i}>
                                <TableCell key={element.stat.name} align="left">{firstLetterUppercase(element.stat.name)}</TableCell>
                                <TableCell key={element.base_stat} align="center">{element.base_stat}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
    )
}

export default Stats

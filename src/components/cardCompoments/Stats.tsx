import { Accordion, AccordionSummary, AccordionDetails, makeStyles, Table, TableBody, TableRow, TableCell, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { IStat } from "../../data/InterfacesPokemon";
import { firstLetterUppercase } from "../../helperFunctions/helperFunctions";

const useStyles = makeStyles((theme) => ({
    accordionDetails: {
        display:"flex",
        justifyContent:"center",
        marginTop:"-10px"
    }
}))


function Stats( 
    { stats, expanded, handleChangeAccordion } 
    : 
    { stats:Array<IStat>, expanded:string | boolean, handleChangeAccordion:(panel:string) => (event:React.ChangeEvent<{}>, newExpanded:boolean) => void}
    ){

    const classes = useStyles();

    return (
        <Accordion expanded={expanded === "panel2"} onChange={handleChangeAccordion("panel2")}>
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

import { Accordion, AccordionSummary, AccordionDetails, Box, Chip, makeStyles, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { IMove } from '../../data/InterfacesPokemon';

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

function Moves( 
    { moves, expanded, handleChangeAccordion  } 
    : 
    { moves:Array<IMove>, expanded:string | boolean, handleChangeAccordion:(panel:string) => (event:React.ChangeEvent<{}>, newExpanded:boolean) => void }
    ){

    const classes = useStyles();

    return (
        <Accordion expanded={expanded === "panel4"} onChange={handleChangeAccordion("panel4")}>
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

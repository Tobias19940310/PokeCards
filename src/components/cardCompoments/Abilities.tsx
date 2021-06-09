import { Accordion, AccordionSummary, AccordionDetails, Box, Chip, makeStyles, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { IAbility } from "../../data/InterfacesPokemon";
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


function Abilities( 
    { abilities, expanded, handleChangeAccordion } 
    : 
    {abilities:Array<IAbility>, expanded:string | boolean, handleChangeAccordion:(panel:string) => (event:React.ChangeEvent<{}>, newExpanded:boolean) => void}
    ){

    const classes = useStyles();

    return (
        <Accordion expanded={expanded === "panel3"} onChange={handleChangeAccordion("panel3")}>
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

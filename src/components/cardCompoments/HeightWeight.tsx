import { Box, Chip, makeStyles } from "@material-ui/core";

import { useState } from "@hookstate/core";
import { ISinglePokemon } from "../../data/InterfacesPokemon";
import { singlePokemonState } from "../../State";

const useStyles = makeStyles((theme) => ({
    chipOutline:{
        margin: theme.spacing(1,1),
        backgroundColor:"white",
        border: "1px solid lightgrey"
    }
}))


function HeightWeight() {
    const classes = useStyles();
    const singlePokemon = useState<ISinglePokemon>(singlePokemonState);
    const height :number = singlePokemon.get().height;
    const weight :number = singlePokemon.get().weight;

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" >
            <Chip label={`Height: ${(height/10).toFixed(2)}m`} className={classes.chipOutline} size="small" />
            <Chip label={`Weight: ${(weight/10).toFixed(2)}kg`} className={classes.chipOutline} size="small" />
        </Box>
    )
}

export default HeightWeight

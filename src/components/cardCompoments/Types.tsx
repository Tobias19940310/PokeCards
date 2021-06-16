import { useEffect } from "react";
import { Box, Chip, makeStyles } from "@material-ui/core";

import { useState } from "@hookstate/core";
import { IType, ISinglePokemon } from "../../data/InterfacesPokemon";
import { singlePokemonState } from "../../State";

import typeColors from "../../data/typeColors.json"

import {firstLetterUppercase} from "../../helperFunctions/helperFunctions";

const useStyles = makeStyles((theme) => ({
    chipColor:{
        margin: theme.spacing(0.5,0.5),
        width: "60%",
        [theme.breakpoints.up("md")]:{
            fontSize:"100%",
        }
    }
}))

function Types() {

    const classes = useStyles();
    const singlePokemon = useState<ISinglePokemon>(singlePokemonState);
    const types :Array<IType> = singlePokemon.get().types;

    const setColorTypes = () :void => {
        const typeChips :Array<HTMLElement> = Object.values(document.querySelectorAll(".type"));
        typeChips.forEach((element :HTMLElement) => {
            const type :string = element.textContent !== undefined ? element.textContent!.toLowerCase() : "unknown";
            for (let i = 0; i < Object.keys(typeColors).length; i++){
                if(Object.keys(typeColors)[i] === type){
                    element.style.backgroundColor = Object.values(typeColors)[i];
                    element.style.color = "white";
                }
            }
        });
    }
    
    useEffect(() => {
        setColorTypes()
    })

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" >
            {types.map((element:IType) => (
                <Chip key={element.type.name} label={firstLetterUppercase(element.type.name)} className={classes.chipColor + " type"}/>
            ))}
        </Box>
    )
}

export default Types

import React, {useEffect} from 'react'
import { Box, makeStyles, Paper, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import fullText from "../data/text.json";

import { IAllPokemon, IAllPokemonSingle, ISinglePokemon } from '../data/InterfacesPokemon'
import { accordionExpandedState, alertTextState, allPokemonState, dialogOpenState, perPageLimitState, singlePokemonState } from '../State';
import {createState, useState} from "@hookstate/core";

import { firstLetterUppercase } from "../helperFunctions/helperFunctions";
import { getAllPokemon, getSinglePokemon } from '../api/pokeApi';


const useStyles = makeStyles((theme) => ({
    paper:{
        width:"auto",
        height:"auto",
        boxSizing:"content-box",
        padding: theme.spacing(1),
        margin: theme.spacing(0.5),
        [theme.breakpoints.up("md")]:{
            padding: theme.spacing(1.5),
            margin: theme.spacing(1)
        },
        [theme.breakpoints.up("lg")]:{
            padding: theme.spacing(2.5),
        },
        [theme.breakpoints.up("xl")]:{
            margin: theme.spacing(1.5),
            padding: theme.spacing(3),
        },
        "&:hover":{
            backgroundColor: "firebrick",
            color: "white",
            cursor:"pointer"
        }
    },
    text:{
        width:"100%",
        textAlign:"center"
    },
    pagination:{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        padding: theme.spacing(2,0),
        margin: theme.spacing(0,0)
    },
    selected:{
        color:"white",
        backgroundColor: "firebrick",
    }
}))

function PokemonList(){
    
    const theme = useTheme();
    const classes = useStyles();
    const mediumBreakpoint = useMediaQuery(theme.breakpoints.up("md"));
    
    const allPokemon = useState<IAllPokemon>(allPokemonState);
    const singlePokemon = useState<ISinglePokemon>(singlePokemonState);
    const perPageLimit = useState<number>(perPageLimitState)
    const accordionExpanded = useState<string | boolean>(accordionExpandedState);
    const paginationCountState = createState<number>(1);
    const paginationCount = useState(paginationCountState);
    const dialogOpen = useState<boolean>(dialogOpenState);
    const alertText = useState<string>(alertTextState);

    useEffect(() => {
        paginationCount.set(calculatePaginationCount());
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const calculatePaginationCount = () :number => {
        return Math.ceil(allPokemon.get().count / perPageLimit.get());
    }
    const handlePagination = (e:object, page:number) :void => {
        //Offset = ab welcher Ordnungszahl startet die Pokemonliste
        const offset = (page -1) * perPageLimit.get();
        getAllPokemon(offset, perPageLimit.get())
        .then((response:IAllPokemon | undefined) => {
            if(response!== undefined) allPokemon.set(response);
            else { alertText.set(fullText.alert.err); dialogOpen.set(true);  }
        })
    }
    const selectSinglePokemon = (event : React.MouseEvent, pokemon : IAllPokemonSingle) :void => {
        accordionExpanded.set(false);
        window.scrollTo({top:0, behavior:"smooth"});

        getSinglePokemon(pokemon.url)
        .then((response:ISinglePokemon | undefined) => {
            if(response!== undefined) singlePokemon.set(response);
            else { alertText.set(fullText.alert.err); dialogOpen.set(true);  }
        })
    }

    return (
        <Box id="pokemonList" data-testid="pokemonList">
            <Box 
                display="flex" 
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center"
            >
            {allPokemon.get().results.map((pokemon :IAllPokemonSingle, i:number)=>(
                <Paper 
                    className={`${classes.paper} ${singlePokemon.get().name === pokemon.name ? classes.selected : ""}`} 
                    key={pokemon.name} onClick={(e) => selectSinglePokemon(e, pokemon)} 
                    data-testid="singlePokemon">
                    <Typography variant="body2" className={classes.text}>{firstLetterUppercase(pokemon.name)}</Typography>
                </Paper>
            ))}
            </Box>
            {paginationCount.get() === 1 ? null :
                <Pagination 
                    count={paginationCount.get()} 
                    className={classes.pagination} 
                    shape="rounded"
                    size={
                        mediumBreakpoint ? 
                        "medium" : "small"
                    } 
                    siblingCount={2}
                    boundaryCount={1}
                    onChange={(e, page) => handlePagination(e, page)}/>
            }
        </Box>
        
    )
}

export default PokemonList

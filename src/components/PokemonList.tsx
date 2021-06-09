import React, { useEffect, useState } from 'react'
import { Box, makeStyles, Paper, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { IAllPokemon, IAllPokemonSingle, ISinglePokemon } from '../data/InterfacesPokemon'
import { firstLetterUppercase } from "../helperFunctions/helperFunctions";


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
    }
}))

function PokemonList( 
    {allPokemon, retrieveAllPokemon, perPageLimit, singlePokemon, retrieveSinglePokemon}
    :
    {allPokemon:IAllPokemon, retrieveAllPokemon:(offset:number)=>void; perPageLimit:number, 
    singlePokemon:ISinglePokemon, retrieveSinglePokemon:(url:string)=>void;}
    ){
    
    const theme = useTheme();
    const mediumBreakpoint = useMediaQuery(theme.breakpoints.up("md"));
    const classes = useStyles();
    const [paginationCount, setPaginationCount] = useState<number>(1);

    useEffect(() => {
        setPaginationCount(calculatePaginationCount());
    }, [allPokemon]) // eslint-disable-line react-hooks/exhaustive-deps

    const calculatePaginationCount = () :number => {
        return Math.ceil(allPokemon.count / perPageLimit);
    }
    const handlePagination = (e:object, page:number) :void => {
        const offset = (page -1) * perPageLimit;
        retrieveAllPokemon(offset);
    }
    const selectSinglePokemon = (event : React.MouseEvent) :void => {
        const element :HTMLElement= event.target as HTMLElement;
        for(let i = 0; i < Object.keys(allPokemon.results).length; i++){
            if(Object.values(allPokemon.results)[i].name === element.textContent?.toLowerCase()){
                retrieveSinglePokemon(Object.values(allPokemon.results)[i].url);
                highlightSinglePokemon(element.textContent)
            }
        }
    }
    const highlightSinglePokemon = (name:string) :void => {
        const container :HTMLElement | null = document.getElementById("pokemonList");
        const pList :Array<HTMLElement> | null = container ? Array.from(container.querySelectorAll("p")) : null;
        pList?.forEach(element => {
            const parent :HTMLElement = element.parentNode as HTMLElement;
            parent.style.backgroundColor = element.textContent === name ? "firebrick" : "";
            parent.style.color = element.textContent === name ? "white" : "";
        });
    }

    return (
        <Box id="pokemonList" data-testid="pokemonList">
            <Box 
            display="flex" 
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            >
            {allPokemon.results.map((pokemon :IAllPokemonSingle, i:number)=>(
                <Paper className={classes.paper} key={pokemon.name} onClick={selectSinglePokemon} data-testid="singlePokemon">
                    <Typography variant="body2" className={classes.text}>{firstLetterUppercase(pokemon.name)}</Typography>
                </Paper>
            ))}
            </Box>
            {paginationCount === 1 ? null :
                <Pagination 
                count={paginationCount} 
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

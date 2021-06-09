import {AppBar, Avatar, Box, Hidden, makeStyles, Toolbar, Typography} from "@material-ui/core";

import fullText from "../data/text.json";
import pokedexImage from "../images/pokedex_sm.png";


const useStyles = makeStyles((theme) => ({
    appbar:{
        backgroundColor:"firebrick",
    },
    header:{
        flexGrow:1,
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        '& > :first-child':{
            margin: theme.spacing(0,5,0,0),
        }
    },
    logo:{
        width:"auto"
    }
}))

function NavBar() {

    const classes = useStyles();

    const text = fullText.navBar;

    return (
        <AppBar className={classes.appbar} position="fixed">
            <Toolbar>
                <Box className={classes.header}>
                    <Typography variant="h5">{text.header}</Typography>
                    <Hidden xsDown>
                        <Typography variant="subtitle1">{text.subHeader}</Typography>
                    </Hidden>
                </Box>
                <Avatar variant="square" src={pokedexImage} className={classes.logo} />
            </Toolbar>
        </AppBar>
    )
}

export default NavBar

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from "@material-ui/core"

import { alertTextState, dialogOpenState } from "../State";
import { useState } from "@hookstate/core";

import fullText from "../data/text.json";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function Alert() {
    const classes = useStyles();
    const text = fullText.alert;
    const dialogOpen = useState<boolean>(dialogOpenState)
    const alertText = useState<string>(alertTextState);

    const handleClose = () => {
        dialogOpen.set(false);
    };

    return (
        <Dialog open={dialogOpen.get()} onClick={handleClose} className={classes.backdrop}>
            <DialogTitle>{text.h}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {alertText.get()}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
                OK
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Alert;

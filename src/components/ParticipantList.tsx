import TextField from "@mui/material/TextField";
import {DrawParticipants} from "./DrawParticipants";
import {db} from "../scripts/firebaseInit";
import React from "react";
import {getRandomParticipant} from "../scripts/firebaseFunctions";
import {Alert, Button, Snackbar} from "@mui/material";
import {Shuffle} from "@mui/icons-material";


function ParticipantList() {
    let autcompleteOptions = []
    const [open, setOpen] = React.useState(false);
    const [winnerObject, setWinnerObject] = React.useState({name:"", severity:"success", message:""});

    async function refreshAutocomplete() {
    }


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    async function getRandom() {
        const res = await getRandomParticipant();
        setOpen(true)
        setWinnerObject(res)
    }

    return <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={winnerObject.severity == "error" ? "error" : "success"} sx={{ width: '100%' }}>
                {winnerObject.name ? "Der Sieger ist " + winnerObject.name + "!" : winnerObject.message}
            </Alert>
        </Snackbar>
        <div className="grid-cols-2">
            <div className="bg-gray-100 shadow-md w-full inset-x-0 fixed mb-20 flex">
                <TextField
                    id="outlined-basic"
                    margin="dense"
                    variant="outlined"
                    className="w-[50%] p-2 m-2 left-2 hover:bg-white hover:shadow-md flex-grow"
                    label="Search"
                />
                <div className="m-2 p-2 left-0">
                    <Button onClick={getRandom} className="h-full" variant="outlined" size="medium"
                            endIcon={<Shuffle/>}>
                        Auslosen
                    </Button>

                </div>
                {/*<DotsVertical className="hoverPointer"/>*/}
            </div>
            <DrawParticipants db={db}/>
        </div>
    </div>
}

export {ParticipantList}
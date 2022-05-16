import React from 'react';
import './App.css';

import {AddParticipant} from './components/addParticipant';
import {ParticipantList} from './components/participantList';
import {Alert, Snackbar} from "@mui/material";

let openAlert = (message: string, error: boolean) => {
};

function App() {
    const [open, setOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState<string>("")
    const [alertError, setAlertError] = React.useState(false)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function openSnackbar(message: string, error: boolean) {
        setSnackbarMessage(message)
        setAlertError(error)
        setOpen(true)
    }

    openAlert = openSnackbar;

    return (
        <div className="w-full h-[100%]">
            <div className="m-2 bg-white shadow-md h-[96vh]">
                <ParticipantList/>
                <AddParticipant/>
            </div>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} className={"shadow-xl mb-20"}>
                <Alert onClose={handleClose} severity={alertError ? "error" : "success"} sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}


export default App;
export {openAlert};

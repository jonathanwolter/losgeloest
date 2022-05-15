import TextField from "@mui/material/TextField";
import React from "react";
import {Button} from "@mui/material";
import {AddCircle} from '@mui/icons-material';
import {addUser} from "../scripts/firebaseFunctions";
import {openAlert} from "../App";

function AddParticipant() {
    const [userNameIncorrect, setUserNameIncorrect] = React.useState(false);
    const [newUserName, setNewUserName] = React.useState("");
    const [newUserTickets, setNewUserTickets] = React.useState(0);

    async function add() {
        if(newUserName === "") {setUserNameIncorrect(true); return;}
        let name = newUserName;
        let tickets = newUserTickets;
        setNewUserName("");
        setNewUserTickets(0)

        await addUser({name, tickets});
        openAlert(`Nutzer ${name} mit ${tickets} Tickets hinzugefügt`, false);
    }

    function handleNameChange(event:any) {
        setUserNameIncorrect(event.target.value === "")
        setNewUserName(event.target.value);
    }
    function handleTicketsChange(event:any) {
        setNewUserTickets(Number(event.target.value));
    }

    return <div className="w-full flex flex-row flex-wrap inset-x-0 bottom-0 bg-gray-100 shadow-md absolute">
        <div className={"flex-grow p-2 m-2 right-0"}>
            <TextField
                error={userNameIncorrect}
                id="addUserName"
                variant="outlined"
                className="w-[50%] m-2 p-4 hover:bg-white"
                label="Name"
                onChange={handleNameChange}
                value={newUserName}
            />
            <TextField
                id="addUserTickets"
                label="Tickets"
                InputProps={{ inputProps: { min: 0, max: 99 } }}
                className="w-[50%] m-2 p-4 hover:bg-white"
                onChange={handleTicketsChange}
                value={newUserTickets}
                type="number"
            />
        </div>
        <div className="m-2 p-2 left-0">
            <Button onClick={add} className="h-full" variant="outlined" size="medium" endIcon={<AddCircle/>}>
                Neu
            </Button>
        </div>
    </div>
}

export {AddParticipant}
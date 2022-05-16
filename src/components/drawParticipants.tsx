import React, {useEffect, useState} from "react";
import {Participant} from "../scripts/participant";

import {changeParticipant, deleteParticipant, getParticipants} from "../scripts/firebaseFunctions";
import {Avatar, Divider, IconButton} from "@mui/material";
import {AddCircleOutline, DeleteOutline, RemoveCircleOutline} from "@mui/icons-material";
import {red} from "@mui/material/colors";


let updateParticipantList: any; //will be function - can be called to refresh the participantlist (theoretically)

//todo outsource block
function ParticipantBlock(part: Participant, {participants, updateList}: any) {
    let participant = part;

    async function changeTickets(number: number) {
        let index = participants.indexOf(participants.filter((p: any) => p.id === participant.id)[0])
        let tickets = Number(participants[index].tickets) + number

        if (tickets < 0) tickets = 0;

        let tempPar = participants[index]
        tempPar.tickets = tickets;
        changeParticipant(tempPar).then(() => updateList());

        participant = participants[index];
    }

    function addTicket() {
        changeTickets(1);
    }

    function removeTicket() {
        changeTickets(-1);
    }

    function deletePart() {
        deleteParticipant(participant.id!).then(() => updateList())
    }

    return <div key={participant.id} className="w-[95%] border-2 m-2 p-2 rounded-md flex flex-row text-2xl shadow-md">
        <Avatar sx={{width: 35, height: 35}}
                className={"shadow-md"}>{participant.name.split(" ").map(s => s[0]).join("").toUpperCase()}</Avatar>
        <Divider orientation="vertical" className="p-2" flexItem/>
        <div className={"px-3 flex-grow w-[50%]"}>{participant.name}</div>
        <Divider orientation="vertical" className="p-2" flexItem/>
        <div className={"px-3 flex flex-grow text-md font-bold w-[30%]"}>
            <IconButton onClick={removeTicket} size="small" className="flex-grow hover:cursor-pointer"
                        children={<RemoveCircleOutline sx={participant.tickets === 0 ? {fontSize: 30, color: red[100]} : {fontSize: 30}}/>}/>
            {participants.filter((p: any) => p.id === participant.id)[0].tickets}
            <IconButton onClick={addTicket} size="small" className="flex-grow hover:cursor-pointer"
                        children={<AddCircleOutline sx={{fontSize: 30}}/>}/>
        </div>
        <Divider orientation="vertical" className="p-2" flexItem/>
        <IconButton onClick={deletePart} className="px-1 mx-2 hover:cursor-pointer"
                    children={<DeleteOutline sx={{fontSize: 30, color: red[500]}}/>}/>
    </div>
}

function DrawParticipants({db}: any) {
    const [participantsState, setParticipantsState] = useState<Array<any>>();
    const [updateCounter, setUpdateCounter] = useState(0); //somehow just updating participantsState doesnt update this component's children

    const getPart = async () => {
        const res = await getParticipants();
        setUpdateCounter(updateCounter + 1);
        setParticipantsState(res);
    };

    updateParticipantList = getPart;

    useEffect(() => {
        getPart();
    }, []);

    return <div className="pt-[70px]">
        <ol>{participantsState ? participantsState.map((p: any) => ParticipantBlock(p, {
            participants: participantsState,
            setParticipants: setParticipantsState,
            updateList: getPart
        })) : ""}</ol>
    </div>
}

export {DrawParticipants, updateParticipantList}
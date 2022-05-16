import TextField from "@mui/material/TextField";
import {DrawParticipants} from "./drawParticipants";
import {db} from "../scripts/firebaseInit";
import React from "react";
import {getRandomParticipant} from "../scripts/firebaseFunctions";
import {Button} from "@mui/material";
import {Shuffle} from "@mui/icons-material";
import {openAlert} from "../App";


function ParticipantList() {
    const [winnerObject, setWinnerObject] = React.useState({name: "", severity: "success", message: ""});

    async function getRandom() {
        const res = await getRandomParticipant();
        setWinnerObject(res.participant)
        openAlert(winnerObject.name ? "Der Sieger ist " + winnerObject.name + "!" : res.message!, res.error)
    }

    return <div>
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
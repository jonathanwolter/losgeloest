import { db } from "./firebaseInit";
import {Participant} from "./participant";
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc} from "firebase/firestore";

import {event} from "../config";

function JSONify(doc:any) {
    return Object.assign(doc.data(), {id: doc.id})
}

async function addUser(participant:Participant) {
    const partCol = collection(db, "veranstaltungen/"+ event + "/participants")
    await addDoc(partCol, participant)

    return Promise.resolve()
}

async function getParticipants() {
    const participantsCol = await collection(db, "veranstaltungen/"+ event + "/participants");
    const participantListObj = (await getDocs(participantsCol)).docs.map(JSONify)

    return participantListObj
};

async function getParticipant(id:string) {
    const participant = await getDoc(await doc(db, "veranstaltungen/"+ event + "/participants", id))

    return JSONify(participant)
}

async function setParticipant(data:Participant) {
    return await setDoc((await doc(db, "veranstaltungen/"+ event + "/participants", data.id!)), data)
}

async function deleteParticipant(id:string) {
    return await deleteDoc((await doc(db, "veranstaltungen/"+ event + "/participants", id)));
}

async function getRandomParticipant(config?:any) {
    const participantsCol = await collection(db, "veranstaltungen/"+ event + "/participants");
    const participantListObj = (await getDocs(participantsCol)).docs.map(JSONify)

    if(participantListObj.length < 2) {return {message:"Nicht genug Teilnehmer gefunden!", error: true}}

    let arrMap:Array<string> = []

    participantListObj.forEach(p => {for(let i = 0; i < p.tickets; i++){arrMap.push(p.id)}})

    if(arrMap.length == 0) {return {message:"Nicht genug Tickets!", error: true}}

    let id = arrMap[Math.floor(Math.random()*arrMap.length)]

    const participant = JSONify(await getDoc(await doc(db, "veranstaltungen/"+ event + "/participants", id)))

    return {participant, error: false}
}

export {addUser, getParticipants, getParticipant, setParticipant, getRandomParticipant, deleteParticipant}
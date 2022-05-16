import {db} from "./firebaseInit";
import {Participant} from "./participant";
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc} from "firebase/firestore";

import {event} from "../config";

const partCol = collection(db, "veranstaltungen/" + event + "/participants")

let localUserStorage: Array<any>;
getFirstLocalStorage().then(() => localUserStorageUpdateListener());


async function getFirstLocalStorage() {
    console.log("downloaded local participants storage")
    localUserStorage = (await getDocs(await collection(db, "veranstaltungen/" + event + "/participants"))).docs.map(JSONify)
}

async function localUserStorageUpdateListener() {
    const q = query(collection(db, "veranstaltungen/" + event + "/participants"));

    const observe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                if (localUserStorage.filter((p: any) => p.id === change.doc.id).length == 0) {
                    localUserStorage.push(JSONify(change.doc));
                    //console.log(localUserStorage);
                }
                //let index = localUserStorage.indexOf(localUserStorage.filter((p:any) => p.id === change.doc.id)[0])
                //console.log("edit", localUserStorage[index])
            }
            if (change.type === "modified") {
                let index = localUserStorage.indexOf(localUserStorage.filter((p: any) => p.id === change.doc.id)[0])
                //console.log("edit", localUserStorage[index])
                localUserStorage[index] = JSONify(change.doc);
            }
            if (change.type === "removed") {
                localUserStorage = localUserStorage.filter((p: any) => p.id !== change.doc.id);
            }
        });
    });

}


function JSONify(doc: any) {
    return Object.assign(doc.data(), {id: doc.id})
}

async function addUser(participant: Participant) {
    await addDoc(partCol, participant)

    return Promise.resolve()
}

async function getParticipants() {
    const participantListObj = localUserStorage ? localUserStorage : (await getDocs(partCol)).docs.map(JSONify)

    return participantListObj
}

async function getParticipant(id: string) {
    let participant: any;
    if (localUserStorage) {
        let index = localUserStorage.indexOf(localUserStorage.filter((p: any) => p.id === id)[0])
        participant = localUserStorage[index];
    } else {
        participant = JSONify(await getDoc(await doc(db, "veranstaltungen/" + event + "/participants", id)))
    }

    return participant
}

async function changeParticipant(data: Participant) {
    let index = localUserStorage.indexOf(localUserStorage.filter((p: any) => p.id === data.id)[0])
    localUserStorage[index] = data;
    return await setDoc((await doc(db, "veranstaltungen/" + event + "/participants", data.id!)), data)
}

async function deleteParticipant(id: string) {
    localUserStorage = localUserStorage.filter((p: any) => p.id !== id)
    return await deleteDoc((await doc(db, "veranstaltungen/" + event + "/participants", id)));
}

//todo: fix
async function getRandomParticipant(config?: any) {
    const participantsCol = await collection(db, "veranstaltungen/" + event + "/participants");
    const participantListObj = (await getDocs(participantsCol)).docs.map(JSONify)

    if (participantListObj.length < 2) {
        return {message: "Nicht genug Teilnehmer gefunden!", error: true}
    }

    let arrMap: Array<string> = []

    participantListObj.forEach(p => {
        for (let i = 0; i < p.tickets; i++) {
            arrMap.push(p.id)
        }
    })

    if (arrMap.length == 0) {
        return {message: "Nicht genug Tickets!", error: true}
    }

    let id = arrMap[Math.floor(Math.random() * arrMap.length)]

    const participant = JSONify(await getDoc(await doc(db, "veranstaltungen/" + event + "/participants", id)))

    return {participant, error: false}
}

export {addUser, getParticipants, getParticipant, changeParticipant, getRandomParticipant, deleteParticipant}
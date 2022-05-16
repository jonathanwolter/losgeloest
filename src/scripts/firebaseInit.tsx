import {initializeApp} from 'firebase/app';
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';
import React from "react";
import {firebaseConfig, fireDebug} from "../config";

const fireApp = initializeApp(firebaseConfig, "los-geloest-firebaseapp");

const db = getFirestore(fireApp);

if(process.env.NODE_ENV == "development") {
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log("emulator connected")
}


if (fireDebug) console.log(fireApp.name + " initialized")
export {fireApp, db, fireDebug};
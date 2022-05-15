import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import React from "react";
import {firebaseConfig, fireDebug} from "../config";

const fireApp = initializeApp(firebaseConfig, "los-geloest-firebaseapp");

const db = getFirestore(fireApp);


if(fireDebug) console.log(fireApp.name + " initialized")
export {fireApp, db, fireDebug};
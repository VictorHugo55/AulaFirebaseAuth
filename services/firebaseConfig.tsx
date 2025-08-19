import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore,collection,addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Vai permitir que seja realizado o getReactNativePersistence mesmo sem tipagem
const {getReactNativePersistence} = require("firebase/auth") as any;

const firebaseConfig = {
  apiKey: "AIzaSyBc5fF_nelqZBK8Pn2elVsr08lACLWZyP0",
  authDomain: "fir-auth-538b0.firebaseapp.com",
  projectId: "fir-auth-538b0",
  storageBucket: "fir-auth-538b0.firebasestorage.app",
  messagingSenderId: "704230853110",
  appId: "1:704230853110:web:0841c1b0eb75374d25dfd7",
  measurementId: "G-E8G54HZ2PM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)


const auth = initializeAuth(app,{
  persistence:getReactNativePersistence(AsyncStorage)
});

export {auth,db,getFirestore,collection,addDoc}
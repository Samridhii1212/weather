
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDbKB3_J8oSt48fPhrm3i9jLt8oPSl7rRs",
    authDomain: "weather-app-35a94.firebaseapp.com",
    projectId: "weather-app-35a94",
    storageBucket: "weather-app-35a94.appspot.com",
    messagingSenderId: "453718571220",
    appId: "1:453718571220:web:cc9e3f7b633eb2a578e341"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth();
export {app,auth};
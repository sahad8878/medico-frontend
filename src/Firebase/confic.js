import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig  = {



    apiKey: "AIzaSyCpZ-UxFHTJTJZIOteayEXQIMBtNP1NzfQ",
    authDomain: "medico-aa1b4.firebaseapp.com",
    projectId: "medico-aa1b4",
    storageBucket: "medico-aa1b4.appspot.com",
    messagingSenderId: "677079386011",
    appId: "1:677079386011:web:c4ab4b242e943ff2dcc33e",
    measurementId: "G-DS0ZY5P2P0"
  };


  const app = initializeApp(firebaseConfig);
  export const db = getFirestore();
  export const storage = getStorage();
  
  export default app;
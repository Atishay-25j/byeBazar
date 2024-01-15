import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
  

  const firebaseConfig = {
    apiKey: "AIzaSyCufVwAjvm5OmIbCFWjZ1jpD9WhYR8hkO8",
    authDomain: "byebazar-e7b2c.firebaseapp.com",
    databaseURL:"https://byebazar-e7b2c-default-rtdb.firebaseio.com/byeBazar.json",
    projectId: "byebazar-e7b2c",
    storageBucket: "byebazar-e7b2c.appspot.com",
    messagingSenderId: "944514482164",
    appId: "1:944514482164:web:a699ffa4fa4111593343a1"
  };
  export const Firebase= firebase.initializeApp(firebaseConfig)//named export
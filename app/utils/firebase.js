import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyD4sb9h8rSa_GtdOHbZ4_x7ys2bfdWv4eE",
    authDomain: "easyhome-403e1.firebaseapp.com",
    databaseURL: "https://easyhome-403e1.firebaseio.com",
    projectId: "easyhome-403e1",
    storageBucket: "easyhome-403e1.appspot.com",
    messagingSenderId: "840980645176",
    appId: "1:840980645176:web:a73a6347d05cfefb702dcd"   
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);
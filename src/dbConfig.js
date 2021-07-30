import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB_gyc5Dk9jKpjLOMfJZV95lvYDIHw7alU",
    authDomain: "streamingapp-103a6.firebaseapp.com",
    databaseURL: "https://streamingapp-103a6-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "streamingapp-103a6",
    storageBucket: "streamingapp-103a6.appspot.com",
    appId: ""
};

const fireB = firebase.initializeApp(firebaseConfig);

const auth = fireB.auth();
const db = fireB.firestore();
const storage = fireB.storage();
const rdb = fireB.database();

export default fireB;
export { auth, db, storage, rdb };

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from 'app-config';

firebase.initializeApp(config.firebase);

const Authentication = firebase.auth();

const Database = {
    ...firebase.firestore(),
    proposals: firebase.firestore().collection('proposals'),
    getTimestamp: () => firebase.firestore.Timestamp.now()
};

export {
    Authentication,
    Database
};

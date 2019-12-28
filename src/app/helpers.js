import firebase from 'firebase';
import 'firebase/auth';
import config from 'app-config';

firebase.initializeApp(config.firebase);

const Authentication = firebase.auth();

const Database = {
    proposalsCollection: firebase.firestore().collection('proposals')
};

export {
    Authentication,
    Database
};

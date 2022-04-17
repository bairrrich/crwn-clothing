import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: 'AIzaSyDEUQ5TKSjKCVPaRfa3wJlqd5yMRpVwKZ8',
    authDomain: 'crwn-db-c2502.firebaseapp.com',
    projectId: 'crwn-db-c2502',
    storageBucket: 'crwn-db-c2502.appspot.com',
    messagingSenderId: '964540662062',
    appId: '1:964540662062:web:ef87273c7b2e9e7c3bfabf',
    measurementId: 'G-DCG4XQGECG',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exist) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log('error creating user', error.massage);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

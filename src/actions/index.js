import { auth, db, rdb } from "../dbConfig";

import { LOGIN, LOGOUT, FETCHABOUTUSER, FETCHSTREAMS } from "./types";

import history from "../history";

export const islogin = (uid) => ({
    type: LOGIN,
    uid
});

export const islogout = () => ({
    type: LOGOUT
});

export const login = formValues => async () => {
    console.log(formValues);
    await auth.signInWithEmailAndPassword(formValues.email, formValues.password).then(() => {
        history.push('/');
    }).catch(err => {
        console.log('Nie zalogowano ', err);
    });
};

export const register = formValues => async () => {
    await auth.createUserWithEmailAndPassword(formValues.email, formValues.password).then(call => {
        db.collection('users_info').doc(call.user.uid).set({
            UserId: call.user.uid,
            UserName: formValues.username,
            Phone: formValues.phone,
            Email: formValues.email
        }).then(() => {
            auth.currentUser.sendEmailVerification().then(() => {
                console.log('Email weryfikacyjny wysłany!');
            })
            history.push('/');
        }).catch(err => {
            console.log('Nie udało się zapisać do firestore pod users_info ', err);
        });
    }).catch(err => {
        console.log('Nie udało się zarejestrować użytkownika ', err);
    });
};

export const logout = () => async () => {
    await auth.signOut().then(() => {
        history.push('/');
    }).catch((err) => {
    });
};

export const fetchAboutUser = (uid) => async (dispatch) => {
    await db.collection('users_info').doc(uid).get().then(doc => {
        dispatch({ type: FETCHABOUTUSER, userInfo: doc.data() });
    });
}

// add new stream

export const addNewStream = (formValues, userId) => async () => {
    const ref = rdb.ref('streams');
    const childRef = ref.push({
        UserId: userId,
        StreamName: formValues.name,
        StreamDesc: formValues.desc,
        StreamGame: formValues.game
    }).catch(err => console.log(err));
    childRef.then(item => {
        ref.child(item.key).update({
            KeyId: item.key
        });
        history.push('/');
    });
}

// fetch streams by userId

export const fetchStreamsById = () => async (dispatch) => {
    rdb.ref('streams').on('value', snapshot => {
        let allstreams = [];
        snapshot.forEach(snap => {
            allstreams.push(snap.val());
        });
        dispatch({ type: FETCHSTREAMS, streams: allstreams });
    });
}

// delete stream by id

export const deleteStreamById = (streamId) => async () => {
    rdb.ref('streams').child(streamId).remove();
}

// edit stream by id

export const editStreamById = (formValues, streamId) => async () => {
    rdb.ref('streams').child(streamId).update({
        StreamName: formValues.name,
        StreamDesc: formValues.desc,
        StreamGame: formValues.game
    }).then(() => {
        history.push('/');
    });
}
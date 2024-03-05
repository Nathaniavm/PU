import { ref } from 'firebase/database';
import { auth, database } from '../firebaseConfig'; //Import firebase instance
import { getUsernameFromID } from './LoggInnBackend';
import { gameExists } from './OpprettLekerBackend';

export async function favoriteGame(gameID) {
    var userID = auth.currentUser;

    console.log("Current GameID: " + gameID);

    var database_ref = ref(database);

    var favoriteData = {
        gameID: gameID,
        userID: userID
    }

    if(! await gameExists(gameID)){
        console.log("Game doesn't exist");
        return;
    }
    let username = await getUsernameFromID(userID);
    console.log(username);
}
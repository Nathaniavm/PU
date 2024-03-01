import { auth, database } from '../firebaseConfig'; //Import firebase instance

export async function favoriteGame(gameID) {
    var userID = auth.currentUser;

    var database_ref = ref(database);

    var favoriteData = {
        gameID: gameID,
        userID: userID
    }

    
}
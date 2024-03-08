import { equalTo, get, orderByChild, orderByKey, push, query, ref, set } from 'firebase/database';
import { auth, database } from '../firebaseConfig'; //Import firebase instance
import { gameIDExists } from './OpprettLekerBackend';

export async function listFavorites(){

    var userID = auth.currentUser.uid;

    const dbRef = ref(database, "favorites");

    const UIDQuery = query(dbRef, orderByChild("userID"), equalTo(String(userID)));

    const snapShot = await get(UIDQuery);

    if(snapShot.exists()){
        // console.log("User exists in favorites database");
        const value = snapShot.val();
        const gameIDs = [];
        
        for (const key in value) {
            if (Object.hasOwnProperty.call(value, key)) {
                const entry = value[key];
                // console.log(value + ", " + key);
                // console.log(entry.gameID);
                gameIDs.push(entry.gameID);
            }
        }
        console.log(gameIDs);
        return gameIDs;
    }
    return [];
}


export async function isFavorited(userID, gameID){
    const dbRef = ref(database, "favorites");

    const UIDQuery = query(dbRef, orderByChild("userID"), equalTo(String(userID)));

    const snapShot = await get(UIDQuery);

    if(snapShot.exists()){
        // console.log("User exists in favorites database");
        const value = snapShot.val();

        for (const key in value) {
            if (Object.hasOwnProperty.call(value, key)) {
                // console.log(value + ", " + key);
                const entry = value[key];
                if (entry.userID == userID && entry.gameID == gameID) {
                    // console.log("Matching entry found. Key: " + key);
                    return true;
                }
            }
        }
        return false;
    }
}

export async function favoriteGame(gameID) {
    var userID = auth.currentUser.uid;
    // console.log(userID)
    // console.log("Current GameID: " + gameID);

    if (await isFavorited(userID, gameID)){
        console.log("User has already favoritized the game");
        return;
    }
    if(! await gameIDExists(gameID)){
        console.log("Game doesn't exist");
        return;
    }

    var favoriteData = {
        gameID: gameID,
        userID: userID,
    }

    const favoritesRef = ref(database, "favorites/");
    const newFavoriteRef = push(favoritesRef);

    
    // console.log("Username: " + username);
    return set(newFavoriteRef, favoriteData)
        .then(() => {
            console.log("Favoritization registered successfully");
            return true;
        })
        .catch((error) => {
            console.log("Error favorizing game: ", error);
            throw error;
        });
}
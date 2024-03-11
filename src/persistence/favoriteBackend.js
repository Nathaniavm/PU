import { equalTo, get, orderByChild, orderByKey, push, query, ref, set , remove, child } from 'firebase/database';
import { auth, database } from '../firebaseConfig'; //Import firebase instance
import { gameIDExists, retrieveGameInfo } from './OpprettLekerBackend';

export async function listFavorites(){

    var userID = auth.currentUser.uid;

    const dbRef = ref(database, "favorites");

    const UIDQuery = query(dbRef, orderByChild("userID"), equalTo(String(userID)));

    const snapShot = await get(UIDQuery);

    if(snapShot.exists()){
        // console.log("User exists in favorites database");
        const value = snapShot.val();
        const gameIDs = [];
        const gameArray = [];
        
        for (const key in value) {
            if (Object.hasOwnProperty.call(value, key)) {
                const entry = value[key];
                // console.log(value + ", " + key);
                // console.log(entry.gameID);
                gameIDs.push(entry.gameID);
            }
        }
        // console.log(gameIDs);

        // TO TURN THE ARRAY OF GAME IDS INTO ARRAY OF GAMES:
        for (const gID of gameIDs) {
            gameArray.push(await retrieveGameInfo(gID));
        }
        // console.log(gameArray);
        return gameArray;
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
                if (entry.userID === userID && entry.gameID === gameID) {
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
            // console.log("Favoritization registered successfully");
            return true;
        })
        .catch((error) => {
            console.log("Error favorizing game: ", error);
            throw error;
        });
}

export async function removeFavoriteGame(gameID) {
    var userID = auth.currentUser.uid;

    // Check if the game is favorited by the user
    if (!(await isFavorited(userID, gameID))) {
        console.log("User has not favoritized the game");
        return;
    }

    const favoritesRef = ref(database, "favorites/");
    
    // Find the favorite entry to remove
    const queryRef = query(favoritesRef, orderByChild('gameID'), equalTo(gameID));
    const snapshot = await get(queryRef);

    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const favoriteKey = childSnapshot.key;
            // Remove the favorite entry
            const favoriteToRemoveRef = child(favoritesRef, favoriteKey);
            remove(favoriteToRemoveRef)
                .then(() => {
                    // console.log("Game removed from favorites successfully");
                })
                .catch((error) => {
                    console.log("Error removing game from favorites: ", error);
                    throw error;
                });
        });
    } else {
        console.log("Game doesn't exist in favorites");
    }
}

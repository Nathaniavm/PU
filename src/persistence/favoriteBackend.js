import { equalTo, get, orderByChild, orderByKey, query, ref, set } from 'firebase/database';
import { auth, database } from '../firebaseConfig'; //Import firebase instance
import { gameExists } from './OpprettLekerBackend';

export async function isFavorited(userID, gameID){
    const dbRef = ref(database, "favorites");

    const UIDQuery = query(dbRef, orderByChild("userID"), equalTo(String(userID)));

    const snapShot = await get(UIDQuery);

    if(snapShot.exists()){
        console.log("User exists in favorites database");
        const value = snapShot.val;
        // console.log(value);
        const favoritedGames = Object.values(value);
        // console.log(favoritedGames);

        for (const fg in favoritedGames) {
            if (favoritedGames[fg].gameID == gameID){
                console.log(favoritedGames[fg].gameID);
            }
        }
    }
}

export async function favoriteGame(gameID) {
    var userID = auth.currentUser.uid;
    // console.log(userID)

    if (await isFavorited(userID, gameID)){
        console.log("User has already favoritized the game");
        return;
    }

    // console.log("Current GameID: " + gameID);

    var favoriteData = {
        gameID: gameID,
        userID: userID,
        listUpdated: Date.now()
    }

    let favoriteID = 1;

    if(! await gameExists(gameID)){
        console.log("Game doesn't exist");
        return;
    }
    
    // console.log("Username: " + username);
    return set(ref(database, "favorites/" + favoriteID), favoriteData)
        .then(() => {
            console.log("Favoritization registered successfully");
            return true;
        })
        .catch((error) => {
            console.log("Error favorizing game: ", error);
            throw error;
        });
}
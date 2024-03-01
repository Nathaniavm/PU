import { getDatabase, ref, set, query, get, limitToLast, orderByKey } from 'firebase/database';
import { auth, database } from '../firebaseConfig'; //Import firebase instance


// Function to get the number of game elements
export async function getLastId(callback) {
    const gamesRef = ref(getDatabase(), "games");
    const lastGameQuery = query(gamesRef, orderByKey(), limitToLast(1));
    const snapshot = await get(lastGameQuery);
    if (snapshot.exists()) {
        const lastId = Object.keys(snapshot.val())[0];
        return Number(lastId); //User exists
    }
    else {
        return null;
    }
}


// Function to register a new game
export async function registerGame(title, description, nPeople, category) {  
    // Declare user variable
    var user = auth.currentUser;

    var database_ref = ref(database);
    // Henter username fra localStorage
    const username = localStorage.getItem('username') || '';


    // Create game data
    var gameData = {
        title: title,
        description: description,
        nPeople: nPeople, 
        registered: Date.now(),
        username: username,
        category: category
    }

    // Get the current number of games
    var gameKey = await getLastId() + 1; 
    
    // Save game data to database under 'games/gameKey'
    return set(ref(database, `games/${gameKey}`), gameData)
        .then(() => {
            console.log("Game registered successfully");
            return "Game registered successfully";
        })
        .catch((error) => {
            console.error("Error registering game:", error);
            throw error;
        });
}

export function deleteGame(gameID){
    
    var game = ref(database, 'games/' + gameID)

    //Does not throw error if gameID doesn't exist
    remove(game)
    alert('Lek slettet')
}

export async function gameExists(gameID){

    try{
        const dbRef = ref(database, "games");
        // console.log("Database: Games" + dbRef);

        const gameQuery = query(dbRef, orderByKey(), equalTo(String(gameID)));

        const snapShot = await get(gameQuery);

        if(snapShot.exists()){
            return true;
        }
        else{
            return false;
        }

    }catch (error){
        console.log("Error med query til databasen: " + error);
        return false;
    }
}
import { getDatabase, ref, set, push, onValue, query, get, limitToLast, orderByKey, orderByChild, equalTo } from 'firebase/database';
import { auth, database } from '../firebaseConfig'; //Import firebase instance


// Function to get the number of game elements
export async function getLastId(callback) {
    const gamesRef = ref(getDatabase(), "games");
    const lastGameQuery = query(gamesRef, orderByKey(), limitToLast(1));
    console.log(1);
    const snapshot = await get(lastGameQuery);
    console.log(snapshot);
    if (snapshot.exists()) {
        const lastId = Object.keys(snapshot.val())[0];
        console.log(5);
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
    // Henter username fra gud vet hvor men det funker
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
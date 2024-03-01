/*import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
import app from './firebaseConfig'; // Import firebase instance

// Database setup
const database = getDatabase(app);
const auth = getAuth(app);

// Function to get the number of game elements
export function getNumberOfGames() {
    const gamesRef = ref(database, 'games');

    return new Promise((resolve, reject) => {
        onValue(gamesRef, (snapshot) => {
            if (snapshot.exists()) {
                const games = snapshot.val();
                const numberOfGames = Object.keys(games).length;
                resolve(numberOfGames);
            } else {
                resolve(0);
            }
        }, (error) => {
            console.error("Error getting number of games:", error);
            reject(error);
        });
    });
}

// Function to register a new game
export function registerGame(title, description, nPeople) {  
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
        username: username
    }

    // Get the current number of games
    return getNumberOfGames().then((numberOfGames) => {
        // Generate a unique key for the new game
        const gameKey = numberOfGames + 1;

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
    }).catch((error) => {
        console.error("Error getting number of games:", error);
        throw error;
    });
}*/


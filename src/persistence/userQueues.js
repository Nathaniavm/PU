import { ref, query, get, orderByChild, equalTo, set, push, remove, child } from 'firebase/database';
import { auth, database } from '../firebaseConfig'; //Import firebase instance
import { gameIDExists, getLastId } from './OpprettLekerBackend';

export async function isQueued(userID, gameID){
    const dbRef = ref(database, "queuedGames");

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

export async function addGameToQueue(gameID){

    if(await gameIDExists(gameID)){

        var userID = auth.currentUser.uid;

        // Check if user has already queued game

        var queuedGames = await retrieveQueue();

        var existsInQ = false;

        if(queuedGames != null){
            for (const qg in queuedGames) {
                if(queuedGames[qg].gameID === gameID){
                    existsInQ = true;
                    break;
                }
            }
        }

        if(existsInQ){
            console.log("Lek finnes allerede i brukers kø")
        }
        else{
            try {        
                // Insert into queuedGames if game is not already queued
                const queueRef = ref(database, "queuedGames/");
                const newQueueRef = push(queueRef);
            

                // const qgKey = await getLastId("queuedGames") + 1;
                // const queueRef = ref(database, `queuedGames/${qgKey}`);
        
                var queueData = {
                    userID: userID,
                    gameID: gameID
                }
        
                return set(newQueueRef, queueData)
                    .then(() => {
                        console.log("Game successfully added to queue");
                        return "Game successfully added to queue";
                    })
                    .catch((error) => {
                        console.error("Error adding game to queue:", error);
                        throw error;
                    });
            }
            catch (error) {
                console.log("Error: ", error)
            }
        }
    }
    else(
        alert("Lek finnes ikke")
    )
}


export async function retrieveQueue(){

    try {
        var userID = auth.currentUser.uid;

        const qgRef = ref(database, "queuedGames");
        const queuedByUserQuery = query(qgRef, orderByChild("userID"), equalTo(userID));
        const snapshot = await get(queuedByUserQuery);

        if (snapshot.exists()) {

            const value = snapshot.val();
            const queuedGames = Object.values(value);

            // Returns an array of game objects
            return queuedGames;
        }

        console.log("Bruker har ingen leker i køen");
        return [];
        
    } catch (error) {
        console.log("Error: ", error)
    }
    
}

export async function removeQueuedGame(gameID) {
    var userID = auth.currentUser.uid;

    // Check if the game is queued by the user
    if (!(await isQueued(userID, gameID))) {
        console.log("User has not queued the game");
        return;
    }

    const queuedRef = ref(database, "queuedGames/");
    
    // Find the queued entry to remove
    const queryRef = query(queuedRef, orderByChild('gameID'), equalTo(gameID));
    const snapshot = await get(queryRef);

    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const queuedKey = childSnapshot.key;
            // Remove the queued entry
            const queuedToRemoveRef = child(queuedRef, queuedKey);
            remove(queuedToRemoveRef)
                .then(() => {
                    console.log("Game removed from queue successfully");
                })
                .catch((error) => {
                    console.log("Error removing game from queue: ", error);
                    throw error;
                });
        });
    } else {
        console.log("Game doesn't exist in queue");
    }
}

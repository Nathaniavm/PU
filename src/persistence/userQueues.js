import { ref, query, get, orderByChild, equalTo, set, push, remove, child } from 'firebase/database';
import { auth, database } from '../firebaseConfig'; //Import firebase instance
import { gameIDExists, retrieveGameInfo } from './OpprettLekerBackend';

export async function isQueued(gameID){

    // Games queued by user
    var queuedGames = await retrieveQueue();

    if(queuedGames.length !== 0){
        for (const qg in queuedGames) {
            const gameKey = Object.keys(queuedGames[qg])[0];
            if(gameKey === gameID){
                return true;
            }
        }
    }

    return false;
}


export async function addGameToQueue(gameID){

    if(await gameIDExists(gameID)){

        if(await isQueued(gameID)){
            alert("Lek finnes allerede i brukers kø")
        }
        else{
            try {    
                var userID = auth.currentUser.uid;

                // Insert into queuedGames if game is not already queued
                const queueRef = ref(database, "queuedGames/");
                const newQueueRef = push(queueRef);
        
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

            var games = [];

            for (const qg in queuedGames) {

                //console.log(queuedGames[qg].gameID);
                const gameInfo = await retrieveGameInfo(queuedGames[qg].gameID);
                games.push(gameInfo);
            }

            // Returns an array of game objects with gameID and values
            return games;
        }

        console.log("Bruker har ingen leker i køen");
        return [];
        
    } catch (error) {
        console.log("Error: ", error)
    }
    
}

export async function removeQueuedGame(gameID) {
    
    // Check if the game is queued by the user
    if (!(await isQueued(gameID))) {
        console.log("User has not queued the game");
    }
    else{
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
}
import { ref, query, get, orderByChild, equalTo, set, push } from 'firebase/database';
import { auth, database } from '../firebaseConfig'; //Import firebase instance
import { gameIDExists, getLastId } from './OpprettLekerBackend';

export async function isQueued(gameID){

    // Games queued by user
    var queuedGames = await retrieveQueue();

    var existsInQ = false;

    if(queuedGames.length != 0){
        for (const qg in queuedGames) {
            if(queuedGames[qg].gameID === gameID){
                existsInQ = true;
                break;
            }
        }
    }

    return existsInQ;
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

            var games = [];

            //GJØR FERDIG DENNE
            for (const qg in queuedGames) {
                gameRef = ref(database, `games/${queuedGames[qg].gameID}`)
                games.push()
            }

            // Returns an array of game objects
            console.log(queuedGames);
            return queuedGames;
        }

        console.log("Bruker har ingen leker i køen");
        return [];
        
    } catch (error) {
        console.log("Error: ", error)
    }
    
}
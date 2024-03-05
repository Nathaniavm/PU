import { ref, query, get, orderByChild, equalTo, set } from 'firebase/database';
import { auth, database } from '../firebaseConfig'; //Import firebase instance
import { gameExists, getLastId } from './OpprettLekerBackend';


export async function addGameToQueue(gameID){

    if(await gameExists(gameID)){

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
            alert("Lek finnes allerede i brukers kø")
        }
        else{
            try {        
                // Insert into queuedGames if game is not already queued
                const qgKey = await getLastId("queuedGames") + 1;
                const queueRef = ref(database, `queuedGames/${qgKey}`);
        
                var queueData = {
                    userID: userID,
                    gameID: gameID
                }
        
                set(queueRef, queueData);

            } catch (error) {
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
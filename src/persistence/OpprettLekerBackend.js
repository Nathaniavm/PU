import { ref, set, query, get, remove, update, limitToLast, orderByKey, orderByChild, equalTo, push } from 'firebase/database';
import { database } from '../firebaseConfig'; //Import firebase instance
import { removeFavoriteGame } from './favoriteBackend';
import { removeQueuedGame } from './userQueues';
import { deleteReviewByGameID } from './GameReviews';


// Function to get the number of game elements
// path variable determines table in database to store values
export async function getLastId(path) {
    const gamesRef = ref(database, path);
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

export async function retrieveGameInfo(gameID) {

    try {
        let gameQuery = query(ref(database, "games"), orderByKey(), equalTo(String(gameID)));

        let snapShot = await get(gameQuery);
    
        if (snapShot.exists()) {
            let value = snapShot.val();
            return value;
        }
    }
    catch (error) {
        console.error("Error retrieving game info: ", error);
    }
}

// Function to register a new game
export async function registerGame(title, description, nPeopleMin, nPeopleMax, category, time) {  
    // Henter username fra localStorage
    const username = localStorage.getItem('username') || '';


    // Create game data
    var gameData = {
        title: title,
        description: description,
        nPeopleMin: nPeopleMin,
        nPeopleMax: nPeopleMax,
        registered: Date.now(),
        username: username,
        category: category,
        time: time,
        nReported: 0,
        nEvaluations: 0,
        averageScore: 0
    }

    // Get the current number of games
    // var gameKey = await getLastId("games") + 1;
    
    const gamesRef = ref(database, "games/");
    const newGameRef = push(gamesRef);

    
    // Save game data to database under 'games/gameKey'
    return set(newGameRef, gameData)
        .then(() => {
            // console.log("Game registered successfully");
            return "Game registered successfully";
        })
        .catch((error) => {
            console.error("Error registering game:", error);
            throw error;
        });
}


export async function updateAverageScore(gameID, score, removed){

    var gameRef = ref(database, `games/${gameID}`);

    const gamesRef = ref(database, "games");
    const scoreGameRef = query(gamesRef, orderByKey(), equalTo(gameID));
    const snapshot = await get(scoreGameRef);

    if (snapshot.exists()) {
        const scoreGame = Object.values(snapshot.val())[0];

        const oldAverageScore = scoreGame.averageScore;
        // console.log("Gammel score: " + scoreGame);
        const n = scoreGame.nEvaluations;

        // removed is true if a review is deleted, false if a new review is written 
        if(removed){
            const newAverageScore = (oldAverageScore * n - score) / (n - 1);
        }
        else{
            const newAverageScore = (oldAverageScore * n + score) / (n + 1);
        }

        const newScoreData = {
            averageScore: newAverageScore,
            nEvaluations: n + 1
        }
        
        update(gameRef, newScoreData);
        // console.log("Ny score: " + newAverageScore);
    }


}




export async function gameIDExists(gameID){ 

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

export async function gameTitleExists(title){

    try{
        const dbRef = ref(database, "games");
        // console.log("Database: Games" + dbRef);

        const gameQuery = query(dbRef, orderByChild("title"), equalTo(String(title)));

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

export async function deleteGame(gameID){

    // Flytta den nederst
    
    const gameRef = ref(database, 'games/' + gameID);

    // FAVORITE
    await removeFavoriteGame(gameID);

    // QUEUE 
    await removeQueuedGame(gameID);

    // REVIEWS
    await deleteReviewByGameID(gameID);

    //Does not throw error if gameID doesn't exist
    remove(gameRef);
    alert('Lek slettet');
}
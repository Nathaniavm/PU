import { ref, set, update, query, get, orderByKey, equalTo } from 'firebase/database';
import { database } from '../firebaseConfig';

export async function reportGame(gameKey){
    try {

        var gameRef = ref(database, `games/${gameKey}`);

        const gamesRef = ref(database, "games");
        const reportedGameQuery = query(gamesRef, orderByKey(), equalTo(String(gameKey)));
        const snapshot = await get(reportedGameQuery);

        if (snapshot.exists()) {
            
            const value = snapshot.val();
            const numberOfReports = Object.values(value)[0].nReported;
    
            var gameData = {
                nReported: numberOfReports + 1
            }
        

            update(gameRef, gameData);
        }
        else {
            alert("Lek eksisterer ikke");
        }
    }
    catch (error){
        console.log("Error med query til databasen ved søking etter lek: " + error);
        return false;
    }

    
}
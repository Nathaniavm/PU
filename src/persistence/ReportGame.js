import { ref, set, update, query, get, orderByKey, equalTo } from 'firebase/database';
import { database } from '../firebaseConfig';
import { child } from '@firebase/database';

export async function reportGame(gameKey){
    try {
        gameKey = 2;
        var database_ref = ref(database);

        var gameRef = ref(database, `games/${gameKey}`);

        const gamesRef = ref(database, "games");
        const reportedGameQuery = query(gamesRef, orderByKey(), equalTo(String(gameKey)));
        const snapshot = await get(reportedGameQuery);

        if (snapshot.exists()) {
            
            const value = snapshot.val();
            console.log(value);
            for (const key in value) {
                console.log(key);
            }
            const numberOfReports = child(database, `games`);
            //snapshot.child("nReported").val();
            console.log(numberOfReports);
    
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
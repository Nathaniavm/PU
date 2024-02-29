import { orderByChild, orderByKey } from "firebase/database";
[]
export async function getGameData(){
    try{
        //Create database reference to "games"
        const dbRef = ref(getDatabase(), "games");

        //Create database query for games
        const gameQuery = query(dbRef, orderByKey());

        //Execute query
        const snapshot = await get(gameQuery);

        if (snapshot.exists()) {
            const gameData = snapshot.val()[Object.keys(snapshot.val())];

            const userEmail = userData.email;
            return userEmail; //User exists
        }
        else {
            return null;
        }
    }
    catch (error){
        console.log("Error med query til databasen ved søking etter brukernavn: " + error);
        return false;
    }
}

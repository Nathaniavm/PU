import { ref, getDatabase, get } from "firebase/database";
import { auth, database } from '../firebaseConfig'; //Import firebase instance


async function getGameData() {
    try {   
        // Create a database reference to "games"
        const dbRef = ref(getDatabase(), "games");
        
        // Execute the query to get the snapshot
        const snapshot = await get(dbRef);

        // Initialize an array to store placeholder games
        const placeholderGames = [];

        if (snapshot.exists()) {
            // Loop through each child node (game) of the snapshot
            snapshot.forEach((childSnapshot) => {
                // Get the gameId of each child node
                const gameId = childSnapshot.key;

                // Get the game data under the gameId
                const gameData = childSnapshot.val();

                // Structure the game data in the placeholderGames format
                const placeholderGame = {
                    gameID: gameId,
                    title: gameData.title,
                    description: gameData.description,
                    category: gameData.category,
                    nPeople: gameData.nPeople
                };

                // Push the placeholder game to the placeholderGames array
                placeholderGames.push(placeholderGame);
            });
        }

        // Return the array of placeholder games
        return placeholderGames;
    } catch (error) {
        console.error("Error getting placeholder games:", error);
        // Handle error appropriately, e.g., throw error or return a default value
        throw error;
    }
}

// Export the getPlaceholderGames function
export { getGameData };
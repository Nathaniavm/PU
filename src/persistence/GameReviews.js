import { gameIDExists, updateAverageScore } from "./OpprettLekerBackend";
import { ref, set, update, query, get, orderByChild, equalTo, push } from 'firebase/database';
import { auth, database } from '../firebaseConfig';



export async function addReview(gameID, rating, evaluation){

    if(await gameIDExists(gameID)){
        try {
            var userID = auth.currentUser.uid;
    
            const reviewRef = ref(database, "gameReviews/");
            const newReviewRef = push(reviewRef);
            console.log(gameID, rating, evaluation);
    
            var reviewData = {
                userID: userID,
                gameID: gameID,
                rating: rating,
                evaluation: evaluation,
                nReported: 0
            }

            updateAverageScore(gameID, rating);
    
            return set(newReviewRef, reviewData)
                .then(() => {
                    return "Review was written successfully";
                })
                .catch((error) => {
                    console.error("Error writing review:", error);
                    throw error;
                });
        } catch (error) {
            console.log("Error: ", error)
        }
    }
    else{
        alert("Lek finnes ikke")
    }
    
}

export async function retrieveReviews(gameID){
    try {
        const reviewRef = ref(database, "gameReviews");
        const reviewsForGameQuery = query(reviewRef, orderByChild("gameID"), equalTo(gameID));
        const snapshot = await get(reviewsForGameQuery);

        if (snapshot.exists()) {

            const value = snapshot.val();
            const gameReviews = Object.values(value);

            return gameReviews;
        }

        // console.log("Lek har ingen evalueringer");
        return [];
        
    } catch (error) {
        console.log("Error: ", error)
    }
    
}


export async function reportReview(reviewID){
    try {
        var userID = auth.currentUser.uid;

        var reviewRef = ref(database, `gameReviews/${reviewID}`);

        const reviewsRef = ref(database, "gameReviews");
        const reportedReviewQuery = query(reviewsRef, orderByChild("gameID"), equalTo(String(reviewID)));
        const snapshot = await get(reportedReviewQuery);

        if (snapshot.exists()) {
            
            const value = snapshot.val();
            const numberOfReports = Object.values(value)[0].nReported;
    
            var reviewData = {
                nReported: numberOfReports + 1
            }
        
            update(reviewRef, reviewData);
        }
        else {
            alert("Evaluering eksisterer ikke");
        }
    }
    catch (error){
        console.log("Error med query til databasen ved søking etter evaluering: " + error);
        return false;
    }
 
}



export async function deleteReview(gameID){

}
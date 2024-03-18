import { gameIDExists, updateAverageScore } from "./OpprettLekerBackend";
import { ref, set, update, query, get, orderByChild, equalTo, push, child, remove, orderByKey } from 'firebase/database';
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



export async function deleteReviewByGameID(gameID){
    reviewRef = ref(database, "gameReviews/");

    reviewQuery = query(reviewRef, orderByChild(gameID), equalTo(gameID));
    const snapshot = await get(reviewQuery);

    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const reviewKey = childSnapshot.key;

            const reviewToRemoveRef = child(reviewRef, reviewKey);
            remove(reviewToRemoveRef)
            .then(() => {
                // console.log("Review removed successfully");
            })
            .catch((error) => {
                console.log("Error removing review: " + error);
            })
        })
    }
    // else {
    //     console.log("This game is not reviewed");
    // }
}

export function deleteReviewByReviewID(reviewID){
    reviewRef = ref(database, "gameReviews/" + reviewID);

    remove(reviewRef);
}

export async function retriveGameFromReview(reviewID){
    // JEG FÅR IKKE TESTA KODEN SÅ IKKE 100% SIKKER PÅ AT DET FUNKER ENDA

    // Expectes that the review exists
    const reviewRef = ref(database, "gameReviews/" + reviewID);
    const snapsnot = await get(reviewRef);

    if (snapsnot.exists()) {
        const reviewData = snapsnot.val();
        const gameID = reviewData.gameID;

        return gameID;
    }
    else {
        console.log("That review doesn't exist!");
    }
}

export async function keepReview(reviewID){
    // JEG FÅR IKKE TESTA KODEN SÅ IKKE 100% SIKKER PÅ AT DET FUNKER ENDA
    const revRef = ref(database, "gameReviews/" + reviewID);

    const snapshot = await get(revRef);

    if (snapshot.exists()) {
        const newUpdateValue = {
            nReported: 0
        }
        update(revRef, newUpdateValue);
        console.log("The game is no longer flagged");
    }
}
import { ref, set, update, query, get, orderByKey, equalTo } from 'firebase/database';
import { auth, database } from '../../firebaseConfig';

export async function retrieveUsername(userID) {

    try {
        let userQuery = query(ref(database, "users"), orderByKey(), equalTo(String(userID)));

        let snapshot = await get(userQuery);
    
        if (snapshot.exists()) {
            let value = snapshot.val();

            return Object.values(value)[0].username;
        }
    }
    catch (error) {
        console.error("Error retrieving game info: ", error);
    }
}
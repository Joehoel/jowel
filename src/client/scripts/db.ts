import { db } from "@client-scripts/firebase";

// Fix for error: "client is offline"
db.enablePersistence();

export async function getUsers() {
	const snapshot = await db.collection("users").get();
	const users = snapshot.docs.map(doc => doc.data());
	return users;
}

export async function getHighscore(uid) {
	const docRef = await db
		.collection("users")
		.doc(uid)
		.get();
	const highscore = await docRef.data().highscore;
	return highscore;
}

export async function updateHighscore(uid, highscore) {
	if (highscore >= (await getHighscore(uid))) {
		console.log("Updating highscore to: ", highscore);
		db.collection("users")
			.doc(uid)
			.update({
				highscore,
			});
	}
}

export default db;

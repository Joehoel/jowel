import firebase from "firebase";

const db = firebase.firestore();

// firebase.auth().onAuthStateChanged(async user => {
//     currentUser = user;
//     if (currentUser) {
//       closeModals();
//       highscoreEl.textContent = await getHighscore(currentUser.uid);
//     } else {
//       openModal();
//     }
//   });

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

export async function writeUserData(user) {
	try {
		const userRef = await db.collection("users").doc(user.uid);
		await userRef.set(user);
	} catch (error) {
		console.error(error);
	}
	"";
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

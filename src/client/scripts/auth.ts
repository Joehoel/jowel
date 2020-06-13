import { db, auth } from "@client-scripts/firebase";
// auth.signOut();

export async function login(email, password) {
	if (email.trim() == "" || password.trim() == "") return;

	try {
		await auth.signInWithEmailAndPassword(email, password);
	} catch (e) {
		console.error(e);
	}
}

export async function register(email, username, password) {
	try {
		const userAuth = await auth.createUserWithEmailAndPassword(email, password);

		await userAuth.user.updateProfile({
			displayName: username,
		});
		const user = {
			username,
			highscore: 0,
			createdAt: Date.now(),
			uid: userAuth.user.uid,
			email: userAuth.user.email,
		};

		writeUserData(user);
	} catch (e) {
		console.error(e.message);
	}
}

export async function writeUserData(user) {
	try {
		const userRef = await db.collection("users").doc(user.uid);
		await userRef.set(user);
	} catch (e) {
		console.error(e);
	}
}

export default auth;

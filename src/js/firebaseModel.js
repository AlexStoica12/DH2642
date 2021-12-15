import { auth, db } from "../plugins/firebaseConfig.js";

const firebaseModel = {
  async loadUserData(userId) {
    let favoritedArtworks;
    await db
      .ref("artsyModel/" + userId)
      .once("value")
      .then(function (snapshot) {
        favoritedArtworks = snapshot.val().favoritedArtworks;
      });
    return favoritedArtworks;
  },
  async saveUserData(userId, favoritedArtworks) {
    await db.ref("artsyModel/" + userId).set({
      favoritedArtworks: favoritedArtworks,
    });
  },
  async signUpAction(payload) {
    let user;
    await auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        user = response;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return user;
  },
  async signInAction(payload) {
    let user;
    await auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        user = response;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return user;
  },
  async signOutAction() {
    await auth
      .signOut()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
};
export default firebaseModel;

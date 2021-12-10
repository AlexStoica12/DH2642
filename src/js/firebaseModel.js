import "../plugins/firebaseConfig.js";
import firebase from "firebase/compat/app";

const firebaseModel = {
  async loadUserData(user) {
    let favoritedArtworks;
    const db = firebase.database();
    console.log(user);
    await db
      .ref("artsyModel/" + user._delegate.uid)
      .once("value")
      .then(function (snapshot) {
        favoritedArtworks = snapshot.val().favoritedArtworks;
      });
    return favoritedArtworks;
  },
  async saveUserData(user, model) {
    const db = firebase.database();
    db.ref("artsyModel/" + user._delegate.uid).set({
      favoritedArtworks: model.favoritedArtworks,
    });
  },
};
export default firebaseModel;

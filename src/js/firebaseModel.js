import { auth, db } from "../plugins/firebaseConfig.js";
import store from "../store/index.js";

// Observe if user is logged in
// If logged in, load their data
auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("setUser", user._delegate.uid);
    firebaseModel
      .loadUserData(user._delegate.uid)
      .then((favoritedArtworks) => {
        store.dispatch("setFavoritedArtworks", favoritedArtworks);
      })
      // Active an observer to observe the favoritedArtworks in the store
      .then(() => {
        const watch = store.watch(
          (state, getters) => getters.favoritedArtworks,
          (newValue) => {
            if (store.getters.getUser !== null) {
              firebaseModel.saveUserData(store.getters.getUser, newValue);
            }
          }
        );
        store.dispatch("setWatch", watch);
      })
      .catch((err) => {
        throw new Error(err);
      });
    // If no user or user logged out, signout the user
  } else {
    if (store.getters.getUser !== null) {
      store.dispatch("signOut");
    }
  }
});

const firebaseModel = {
  // One time call to load users data from firebase
  async loadUserData(userId) {
    if (userId !== null) {
      let favoritedArtworks;
      await db
        .ref("artsyModel/" + userId)
        .once("value")
        .then(function (snapshot) {
          // If data is null or non-existant, return an empty array of favoritedArtworks
          if (snapshot.exists()) {
            favoritedArtworks = snapshot.val().favoritedArtworks;
          } else {
            favoritedArtworks = [];
          }
        });
      return favoritedArtworks;
    }
  },
  // Persist user's data
  async saveUserData(userId, favoritedArtworks) {
    await db.ref("artsyModel/" + userId).set({
      favoritedArtworks: favoritedArtworks,
    });
  },
  // Sign Up the User
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
  //Performs the sign in function pased on the email and password
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
  //Performs the sign out function
  async signOutAction() {
    await auth
      .signOut()
      .then()
      .catch((error) => {
        throw new Error(error);
      });
  },
};
export default firebaseModel;

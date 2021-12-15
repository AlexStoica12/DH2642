import { auth, db } from "../plugins/firebaseConfig.js";
import store from "../store/index.js";

auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("setUser", user._delegate.uid);
    firebaseModel
      .loadUserData(user._delegate.uid)
      .then((favoritedArtworks) => {
        store.dispatch("setFavoritedArtworks", favoritedArtworks);
      })
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
  } else {
    if (store.getters.getUser !== null) {
      store.dispatch("signOut");
    }
  }
});

const firebaseModel = {
  async loadUserData(userId) {
    if (userId !== null) {
      let favoritedArtworks;
      await db
        .ref("artsyModel/" + userId)
        .once("value")
        .then(function (snapshot) {
          if (snapshot.exists()) {
            favoritedArtworks = snapshot.val().favoritedArtworks;
          } else {
            favoritedArtworks = [];
          }
        });
      return favoritedArtworks;
    }
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
      .then()
      .catch((error) => {
        throw new Error(error);
      });
  },
};
export default firebaseModel;

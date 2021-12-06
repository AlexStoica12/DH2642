# artpoint

Artpoint is an application designed for helping people discover new art and allowing them to keep a personal Gallery of the art they like.
It is possible to search for artworks, add artworks to your Gallery, explore similar artworks to the ones you like, and
find more artworks from your favorite artist.

Artwork uses the [Artsy API](https://www.artsy.net/).

## Done so far

- Created initial framework for the application including all routes. (Home, Profile, Signin, Details)
- Set up API source file, containing needed API calls.
- Created the Model, which keeps a state for the current user.
- Created the Home (or search) view that displays an initial set of artworks retrieved from the API.
- Created static (with fake data) views for Profile, Signin, and Details.
- Home calls the api
- Set up vuex store.
- Navbar, for application navigation.

## To Do

- Seperation of concerns need to be even better (Vuex, Api and Model leak into each other)
- Make views dynamic, such that they use the model and API data.
- Configure firebase for 1 user
- Configure firebase to allow for multi-user use of the application.
- Set up authentication.

If time allows:

- Allow the user to keep multiple collections in their Gallery.
- Allow users to browse other people's Galleries.

## Project structure

`src/js/apiConfig.js`: API config containing tokens.

`src/js/artsyModel.js`: Model for business logic.

`src/js/artsySource.js`: API interface, containing function for each endpoint needed in Artpoint.

`src/router/index.js`: Router file containing the application's routes.

`src/store/index.js`: Vuex store for keeping application state.

`src/components/Navbar.vue`: Contains the application's navbar.

`src/views/Details.vue`: Details view displaying the current artwork.

`src/views/Home.vue`: Home view displaying an initial set of artworks and containing search functionality.

`src/views/Profile.vue`: Profile view displaying the artworks to My Gallery.

`src/views/Signin.vue`: Signin containing user signin for authentication.

`src/views/Test.vue`: Used for testing individual components.

`src/App.vue`:

`src/main.js`:

`server.js`: Heroku config

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

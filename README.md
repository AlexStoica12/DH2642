# artpoint

Artpoint is an application designed for helping people discover new art and allowing them to keep a personal Gallery of the art they like.
It is possible to search for artworks, add artworks to your Gallery, explore similar artworks to the ones you like, and find more artworks from your favorite artist. The website is responsive thus can be used on mobile or on a computer.

Artwork uses the [Artsy API](https://www.artsy.net/).

# Agreement with Cristian

We are using Model View View Model (MV-VM) and Vue's outdated template syntax rather than the powerful tool known as JSX. As a result, most of our views do not follow View-Presenter seperation. We have an agreement with Cristian regarding this issue.

The only views following View-Presenter seperation are:

- Home (Presenter) | HomeView (View)
- Profile (Presenter) | ProfileView (View)

# Project structure

### General Files

`src/App.vue`: Initalises the app. Router-View is the main part of the app, Navbar above all screens. Calls "login" in Vuex store to retrieve token from ArtsyAPI and stores in Vuex store.

### Router

`src/router/index.js`: Router file containing the application's routes. It defines which Views should be rendered on specific routes and defines the default route.

### Model

`src/js/artsyModel.js`: Model for business logic.

### State Management

`src/store/index.js`: Vuex store for keeping application state such as the model, api token (X-App Token is required to use API) and User ID (to check if a user is logged in)

### API

`src/js/apiConfig.js`: API config containing tokens.  
`src/js/artsySource.js`: API interface, containing function for each endpoint needed in Artpoint.

### Persistence

`src/plugins/firebaseConfig.js`: Config file for firebaseModel. It defines the project, intialises the database, auth and sets the database persistence to true (if user closes website, remembers that they were logged in)  
`src/js/firebaseModel.js`: Initially defines an observer to check if a user is logged in, if so, it loads the users data and an observer is created to watch the model. Everytime there is a change to the favoritedArtworks, called saveUserData to persist the model. If a user logs out, favoritedArtworks observer is disabled and persistance is no longer in use.

### Views

`src/views/Details.vue`: Details view displaying the current artwork, similar artworks to the current artwork, and additional artworks from the artist of the currenet artwork..  
`src/views/Home.vue`: Home presenter.  
`src/views/HomeView.vue`: Home view displaying an initial set of artworks and containing search functionality.  
`src/views/Profile.vue`: Profile presenter.  
`src/views/ProfileView.vue`: Profile view displaying the favorited artworks to My Gallery. When favorited artworks is empty, then it will direct to the home to explore artworks.

### Components

`src/components/detailsCard.vue`: Contains the application's details card.  
`src/components/homeCard.vue`: Contains the application's home card.  
`src/components/Navbar.vue`: Contains the application's navbar.  
`src/components/Signin.vue`: Contains the application's signin dialog.  
`src/components/Signup.vue`: Contains the application's signup dialog.

### Heroku

`server.js`: Heroku config

### Third Party Plugin

`src\plugins\vuetify.js`: Initialises of the third party plugin Vuetify. Throughout the app, Vuetify is used to help create the Views easily.

# Project setup

### Install the dependencies

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Persistence

By default persistence is disabled. We allow users to use the app and add to their local gallery without persisting the data. Once you sign up or sign in with an account, your data will begin persisting.

Feel free to use this account:

```
email: taco5@gmail.com
password: 123456
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

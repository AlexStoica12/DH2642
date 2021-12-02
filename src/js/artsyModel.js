import artsySource from "./artsySource";

class ArtsyModel {
  constructor(
    // All Favorited Artwork
    favoritedArtworks = [],
    // currentArtworkDetails is an object containing id, title, category, medium, dimension, _links
    currentArtworkDetails = null,
    currentArtworkError = null,
    currentArtworkId = null,
    // artist is an array of object containing id, name, birthday, deathday, biography, nationality
    currentArtists = null,
    currentSimilarArtworks = null
  ) {
    this.favoritedArtworks = favoritedArtworks;
    this.currentArtworkDetails = currentArtworkDetails;
    this.currentArtworkError = currentArtworkError;
    this.currentArtworkId = currentArtworkId;
    this.currentArtists = currentArtists;
    this.currentSimilarArtworks = currentSimilarArtworks;
  }
  // Method
  setCurrentArtwork(id) {
    // If model's current artwork and new current artwork is same
    // Return (avoids unneccesary network call)
    if (this.currentArtworkId === id) {
      return;
    } else {
      this.currentArtworkId = id;
      this.currentArtworkDetails = null;
      this.currentArtworkError = null;
      this.currentArtists = null;
      // If current artwork is not null or undefined
      if (
        this.currentArtworkId !== null &&
        this.currentArtworkId !== undefined
      ) {
        // Get the artwork details for the new artwork
        artsySource
          .searchArtworks(id)
          .then((artwork) => {
            if (this.currentArtworkId === id) {
              this.currentArtworkDetails = {
                id: artwork.id,
                title: artwork.title,
                category: artwork.category,
                medium: artwork.medium,
                dimensions: artwork.dimensions,
                _links: artwork._links,
              };
              this.setCurrentArtist(artwork.id);
              this.setCurrentSimilarArtworks(artwork.id);
            }
          })
          // If there is an error
          .catch((err) => {
            // Again, check that new dish has the same as the current dish
            if (this.currentArtworkId === id) {
              // Change error message and notify observers
              this.currentArtworkError = err;
            }
          });
      }
    }
  }

  setCurrentArtist(id) {
    artsySource.searchArtistParams({ artwork_id: id }).then((artists) => {
      this.currentArtists = artists._embedded.artists;
    });
  }

  setCurrentSimilarArtworks(id) {
    artsySource
      .searchArtworksParams({ similar_to_artwork_id: id })
      .then((artworks) => {
        this.currentSimilarArtworks = artworks._embedded.artworks;
      });
  }

  // Sets the favorited artworks from a list of artworks given
  setFavoritedArtworks(favorites) {
    this.favoritedArtworks = [...favorites];
  }

  // Adds an Artwork to the Favorited Artworks
  addToFavorited(currentArtwork) {
    if (
      this.favoritedArtworks.some((artwork) => artwork.id === currentArtwork.id)
    ) {
      return;
    }
    this.favoritedArtworks = [...this.favoritedArtworks, currentArtwork];
  }

  // Removes an artwork from favorited
  removeFromFavorited(currentArtwork) {
    if (
      this.favoritedArtworks
        .map((artwork) => artwork.id)
        .includes(currentArtwork.id)
    ) {
      this.favoritedArtworks = [...this.favoritedArtworks].filter(
        (artwork) => artwork.id !== currentArtwork.id
      );
    }
  }

  async testModel() {
    console.log("Entering Model Test");
    const myModel = new ArtsyModel();
    let artworks = await artsySource.searchAllArtworks();
    artworks = artworks._embedded.artworks;
    const five_artworks = artworks.slice(10, 15);
    const artwork = artworks[7];
    await myModel.addToFavorited(artwork);
    console.log("Added an artwork to favorited", myModel);
    await myModel.removeFromFavorited(artwork);
    console.log("Removed an artwork from favorited", myModel);
    await myModel.setFavoritedArtworks(five_artworks);
    console.log("Set all the favorited artworks from an array", myModel);
    await myModel.setCurrentArtwork(five_artworks[2].id);
    console.log("Set the current artwork", myModel);
  }
}

export default ArtsyModel;

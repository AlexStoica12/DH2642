const artsySource = {
  apiCall(params) {
    return fetch("https://api.artsy.net/api/" + params, {
      method: "GET",
      headers: {
        //  TODO: token needs to be requested every week, need to do this automatically.
        "X-Xapp-Token":
          "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI2MTliYWNlZTlkZmFlODAwMGRmYmVjNDYiLCJleHAiOjE2Mzg5MDY0MDIsImlhdCI6MTYzODMwMTYwMiwiYXVkIjoiNjE5YmFjZWU5ZGZhZTgwMDBkZmJlYzQ2IiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjYxYTY3ZmEyMjRhOWRiMDAwYjA5ZDcyMyJ9.3RX65kmYX8KXUxMR_bDaiE1EDFQVYJ2qe5rLni1qdkU",
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  },
  searchArtistID(id) {
    return artsySource.apiCall("/artists/" + id).then((data) => {
      return data;
    });
  },
  searchQuery(query) {
    return artsySource.apiCall("search?q=" + query).then((data) => {
      return data;
    });
  },
  searchArtworks(id) {
    return artsySource.apiCall("/artworks/" + id).then((data) => {
      return data;
    });
  },
};

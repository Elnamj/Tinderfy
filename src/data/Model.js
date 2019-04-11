import ObservableModel from "./ObservableModel";

class Model extends ObservableModel {
    constructor(props) {
        super(props);
        this._genreList = ["Pop", "Hiphop", "Jazz", "R&B", "Electronic/Dance", "Rock", "Indie", "Metal", "Country", "Soul", "Klassiskt"];
        this._searchResult = [];
        this._playlist = [];
        this._playlistName = "";
        this.token = "";
        this.state = {
          httpOptions: {
            headers: { 'Authorization': 'Bearer ' + this.token}
          }
        }
      }

    getGenreTypeList() {
        return this._genreList;
    }

    getPlaylist() {
        return this._playlist;
    }

    setPlaylistName(){

    }

    getPlaylistName(){
      return this._playlistName;
    }

    addToPlaylist(){

    }
    setToken(token){
      this.token = token;
    }

    getArtistId(artistName){
    const url = "\thttps://api.spotify.com/v1/me";
    return fetch(url, this.state.httpOptions).then(response => response.json())
        .catch(this.handleError);
    }


}


const model = new Model();
export default model;

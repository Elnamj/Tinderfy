import ObservableModel from "./ObservableModel";

class Model extends ObservableModel {
    constructor() {
        super();
        this._genreType = ["Blues", "Pop", "Hip hop", "Jazz"];
        this._moodTyper = ["Happy", "Sad", "Life Sucks", "Love life"];
        this._playlist = [{name: "Sucker", artist: "Jonas Brothers", albumcover: "https://akns-images.eonline.com/eol_images/Entire_Site/2019128/rs_1080x1080-190228122719-1080-jonas-brothers-album-sucker-reunion-cover-cc.22819.jpg?fit=inside|900:auto&output-quality=90"},
      {name: "Preach", artist: "John Legend", albumcover: "https://m.media-amazon.com/images/I/71uiVdP+ikL._SS500_.jpg"},
      {name: "Without You (feat. Sandro Cavazza)", artist: "Avicii", albumcover: "http://st.cdjapan.co.jp/pictures/l/11/21/UICO-1299.jpg"}];
        this._playlistName = "Mickis playlist";
        this._currentSong = {
            title: "Sucker",
            artist: "Jonas Brothers",
            released: 2019,
            album: "Sucker",
            image: "https://akns-images.eonline.com/eol_images/Entire_Site/2019128/rs_1080x1080-190228122719-1080-jonas-brothers-album-sucker-reunion-cover-cc.22819.jpg?fit=inside|900:auto&output-quality=90"
        }
      }

    getGenreTypeList() {
        return this._genreType;
    }

    getMoodTypeList() {
        return this._moodTyper;
    }

    getPlaylist() {
        return this._playlist;
    }

    getCurrentSong() {
        return this._currentSong;
    }

  getPlaylistName(){
    return this._playlistName;
  }
}


const model = new Model();
export default model;

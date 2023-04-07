import {
  GET_USER_SPOTIFY_PLAYLIST_BEGIN,
  GET_USER_SPOTIFY_PLAYLIST_SUCCESS,
  GET_USER_SPOTIFY_PLAYLIST_FAILED,
  ADD_SONGS_BEGIN,
  ADD_SONGS_SUCCESS,
  ADD_SONGS_FAILED,
} from "./../Actions";

const PlaylistReducer = (state, action) => {
  if (action.type === GET_USER_SPOTIFY_PLAYLIST_BEGIN) {
    const tok = action.payload;
    return { ...state, all_playlists_loading: true, token: tok };
  }
  if (action.type === GET_USER_SPOTIFY_PLAYLIST_SUCCESS) {
    const data = action.payload;
    return { ...state, all_playlists_loading: false, all_Playlists: data };
  }
  if (action.type === GET_USER_SPOTIFY_PLAYLIST_FAILED) {
    return { ...state, all_playlists_loading: false };
  }
  if (action.type === ADD_SONGS_BEGIN) {
    return { ...state, new_playlist: [] };
  }
  if (action.type === ADD_SONGS_SUCCESS) {
    const data = action.payload;
    return { ...state, new_playlist: data };
  }
  if (action.type === ADD_SONGS_FAILED) {
    return { ...state };
  }
};

export default PlaylistReducer;

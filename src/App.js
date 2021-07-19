import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";
import Login from "./Login";
import Player from "./Player";
import { getTokenFromUrl } from "./spotify";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      spotify.setAccessToken(_token);
      // setToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });
      
      spotify.getUserPlaylists().then((playlists) => {
        console.log("playlists", playlists)
        let selectedPlaylist = playlists.items[0];
        console.log("selectedPlaylist", selectedPlaylist);
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
        dispatch({
          type: "SELECTED_PLAYLIST",
          selectedPlaylist: selectedPlaylist,
        });
      });

      spotify.getMySavedAlbums({limit: 50}).then((savedAlbums) => {
        console.log("savedAlbums", savedAlbums);
        dispatch({
          type: "SET_SAVED_ALBUMS",
          savedAlbums,
        });
      })

      spotify.getMyTopArtists().then((myTopArtists)=>{
        console.log("myTopArtists", myTopArtists);
        dispatch({
          type: "SET_MY_TOP_ARTISTS",
          myTopArtists,
        });
      })

    }
  }, []);
  // console.log("token", token);
  // console.log("user", user);
  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;

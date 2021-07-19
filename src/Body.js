import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Body.css";
import { useDataLayerValue } from "./DataLayer";
import Header from "./Header";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Tooltip } from "@material-ui/core";

function Body({ selectedPlaylist, spotify }) {
  const [tracks, setTracks] = useState();
  const [images, setImages] = useState();
  const [progress, setProgress] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState();
  const [{ playlists }, dispatch] = useDataLayerValue();
  const [chosen, setChosen] = useState();
  console.log("selectedPlaylist", selectedPlaylist);

  let callback = (value) => {
    if (typeof value !== "string") {
      // console.log("selectedTrack", value);
      setSelectedTrack(value);
      setChosen(value);
      playSong(value.id);
      dispatch({
        type: "SELECTED_TRACK",
        selectedTrack: value,
      });
    }
  };

  useEffect(() => {
    (async () => {
      await spotify.getPlaylistTracks(selectedPlaylist?.id).then((tracks) => {
        console.log("tracks", tracks);
        setTracks(tracks);
        setImages(selectedPlaylist.images[0]);
      });
    })();
  }, [selectedPlaylist]);

  const playPlaylist = (id) => {
    setImages(selectedPlaylist.images[0]);
    spotify
      .play({
        context_uri: selectedPlaylist?.uri,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          setProgress(r.progress_ms);
          dispatch({
            type: "SELECTED_TRACK",
            selectedTrack: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    console.log("songid", id);
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          // setProgress(r.progress_ms);
          // console.log(r);
          dispatch({
            type: "SELECTED_TRACK",
            selectedTrack: r.item,
          });
          // setTracks(r.item);
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className="body">
      <Header spotify={spotify} />
      {/* Playlist heading and thumbnail */}
      <div className="body__info">
        <img src={images?.url} alt="playlist_cover" />
        <div className="body__infoText">
          <h2>{selectedPlaylist?.name}</h2>
          <p>{selectedPlaylist?.description}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <Tooltip title="Play Playlist">
            <PlayCircleFilledIcon
              className="body__shuffle"
              onClick={playPlaylist}
            />
          </Tooltip>

          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>
      </div>
      {/* List of songs with title, artist, album, date,
         duration of song and click of the item song should play */}
      <InfiniteScroll dataLength={10}>
        {tracks ? (
          tracks?.items?.map((item) => (
            <SongRow
              track={item.track}
              playSong={playSong}
              key={item.track?.id}
              parentCallBack={callback}
              track__selected={item.track === chosen}
            />
          ))
        ) : (
          <h1> No tracks </h1>
        )}
      </InfiniteScroll>
    </div>
  );
}

export default Body;

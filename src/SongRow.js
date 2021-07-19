import React, { useState } from "react";
import "./SongRow.css";

function SongRow({ track, playSong, parentCallBack, track__selected }) {
  // console.log(track);
  return (
    <div
      onClick={() => parentCallBack(track)}
      className={track__selected ? "songRow__selected" : "songRow"}
    >
      <img
        className="songRow__album"
        src={track?.album?.images[0]?.url}
        alt=""
      />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name} &nbsp; &nbsp; &nbsp;
        </p>
      </div>
      <div className="songDuration">
        {(track.duration_ms / 60000).toFixed(2).replace(".", ":")}
      </div>
    </div>
  );
}

export default SongRow;

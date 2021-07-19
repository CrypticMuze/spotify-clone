import React, { useState } from "react";
import "./Player.css";
import Body from "./Body";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { useDataLayerValue } from "./DataLayer";

function Player({ spotify }) {
  const [{ selectedPlaylist, selectedTrack}] = useDataLayerValue();

  return (
    <div className="player">
      <div className="player_body">
        <SideBar spotify={spotify}/>
        <Body selectedPlaylist={selectedPlaylist} spotify={spotify} />
      </div>
      <Footer selectedTrack={selectedTrack} spotify={spotify}/>
    </div>
  );
}

export default Player;

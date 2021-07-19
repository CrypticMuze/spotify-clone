import React, { useState } from "react";
import "./SideBar.css";
import SideBarOption from "./SideBarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { getTokenFromResponse } from "./spotify";
import { useDataLayerValue } from "./DataLayer";
import InfiniteScroll from "react-infinite-scroll-component";

function SideBar({ spotify }) {
  const viewHeight = window.outerHeight;
  const [{ playlists, savedAlbums }, dispatch] = useDataLayerValue();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [chosen, setChosen] = useState();
  console.log(savedAlbums);

  let callback = (value) => {
    if(typeof value !== "string"){
      console.log("selectedPlaylist", value);
      setSelectedPlaylist(value);
      setChosen(value);
      dispatch({
        type: "SELECTED_PLAYLIST",
        selectedPlaylist: value,
      });
    }
  };

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <SideBarOption Icon={HomeIcon} option="Home" parentCallBack={callback} />
      <SideBarOption
        Icon={SearchIcon}
        option="Search"
        parentCallBack={callback}
      />
      <SideBarOption
        Icon={LibraryMusicIcon}
        option="Your Library"
        parentCallBack={callback}
      />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      <InfiniteScroll dataLength={10}>
        {playlists?.items?.map((playlist) => (
          <SideBarOption
            option={playlist.name}
            playlist={playlist}
            key={playlist.name}
            parentCallBack={callback}
            sidebarOption__selected={playlist === chosen}
          />
        ))}
        
      </InfiniteScroll>
    </div>
  );
}

export default SideBar;

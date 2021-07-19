import React, { useEffect, useState } from "react";
import "./Footer.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, makeStyles, Slider, Typography } from "@material-ui/core";
import { useDataLayerValue } from "./DataLayer";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function Footer({ selectedTrack, spotify }) {
  const [artists, setArtists] = useState(null);
  const [progress, setProgress] = useState(10);
  const [{ token, playing }, dispatch] = useDataLayerValue();
  const [track, setTrack] = useState();
  console.log("selectedTrack", selectedTrack);
  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });
      setTrack(r.item);
      dispatch({
        type: "SELECTED_TRACK",
        selectedTrack: r.item,
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      let item = selectedTrack?.artists?.find((item) => item);
      setArtists(item);
    })();
  }, [selectedTrack, track]);


  useEffect(() => {
    setTrack(selectedTrack);
  }, [selectedTrack]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      setProgress(r.progress_ms);
      setTrack(selectedTrack);
      // let track = r.item.artists?.find((item) => item);
      // setArtists(track);
      dispatch({
        type: "SELECTED_TRACK",
        selectedTrack: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 10 : prevProgress + 10
  //     );
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [progress]);

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      setProgress(r.progress_ms);
      setTrack(selectedTrack);
      // let track = r.item?.artists?.find((item) => item);
      // setArtists(track);
      dispatch({
        type: "SELECTED_TRACK",
        selectedTrack: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  
  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={track?.album?.images[0].url}
          alt=""
        />
        {track ? (
          <div className="footer__songInfo">
            <h4>{track?.name}</h4>
            <p>{track?.artists?.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon onClick={skipPrevious} className="footer__icon" />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          >
            {" "}
          </PlayCircleOutlineIcon>
        )}
        <SkipNextIcon onClick={skipNext} className="footer__icon" />
        <RepeatIcon className="footer__green" />
      </div>

      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            {/* <PlaylistPlayIcon onClick={playPlaylist} /> */}
          </Grid>
          <Grid item>
            <VolumeDownIcon  />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>

      <div className="footer__progress">
        {/* <LinearProgressWithLabel value={progress} /> */}
      </div>
    </div>
  );
}

export default Footer;

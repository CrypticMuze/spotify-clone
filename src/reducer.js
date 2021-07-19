export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    token: null,
    savedAlbums: [],
    myTopArtists: [],
    selectedPlaylist: {},
    playedPlaylist: {},
    selectedTrack: {}
};

const reducer = (state, action) => {
    console.log("action", action);

    // action -> type, [payload]

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing,
            }
        case "SET_ITEM":
            return {
                ...state,
                item: action.item,
            }
        case "SET_TRACKS":
            return {
                ...state,
                tracks: action.tracks,
            }    
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            }
        case 'SET_SAVED_ALBUMS':
            return {
                ...state,
                savedAlbums: action.savedAlbums
            }
        case 'SET_MY_TOP_ARTISTS':
            return {
                ...state,
                myTopArtists: action.myTopArtists
            }
        case 'SELECTED_PLAYLIST':
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist
            }
        case 'PLAYED_PLAYLIST':
            return {
                ...state,
                playedPlaylist: action.playedPlaylist
            }
        case 'SELECTED_TRACK':
            return {
                ...state,
                selectedTrack: action.selectedTrack
            }     
        default:
            return state;
    }
}

export default reducer;
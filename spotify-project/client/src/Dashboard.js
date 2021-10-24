import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import SimilarSongs from "./SimilarSongs"

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [recommendations, setRecommendations] = useState([])
  const [currentTrack, setcurrentTrack] = useState([])
  const [cont, setCont] = useState(0);

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
  }

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  /*
    Gets recommended tracks from the currently playing track
  */
  useEffect(() => {
    if (!accessToken) return
    if (!playingTrack) return
    if (playingTrack  === currentTrack) return

    setcurrentTrack(playingTrack)

    var songId = playingTrack.uri.substring(14)
    console.log(playingTrack)
    spotifyApi.getRecommendations({limit:10, seed_tracks: songId}).then(res => {
      setRecommendations(res.body.tracks)
    })

  }, [recommendations, accessToken, playingTrack, currentTrack])

  /*
    
  */
  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  return (
    <Container className="d-flex flex-column py-3" style={{ height: "100vh" }}>


    
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto"}}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        
        {searchResults.length === 0 && (
          <span className="text-center border-5 border-primary" style={{ whiteSpace: "pre" }}>
            <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
          </span>
          
        )}

        <SimilarSongs similarSongList={recommendations} />

      </div>
    </Container>
    
    
  )
}
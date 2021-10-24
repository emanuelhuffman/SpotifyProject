import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  const size = {
    width: '100%',
    height: '80',
  }

  if (!accessToken) return null
  return (
    <span >
      <SpotifyPlayer
      token={accessToken}
      uri={trackUri ? [trackUri] : []}
      size={size}
    />
    </span>
    
  )
}
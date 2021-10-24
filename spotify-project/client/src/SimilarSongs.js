import React from "react"

export default function SimilarSongs({ similarSongList, title, artist }) {

    const songs = similarSongList.map((song) => 
        <li>{song.artist}</li>
    );

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
    >
      
      <div className="ml-3">
        <ul>{songs}</ul>
       </div>
    </div>
  )
}
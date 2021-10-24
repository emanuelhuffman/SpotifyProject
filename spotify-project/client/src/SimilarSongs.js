import React from "react"

export default function SimilarSongs({ similarSongList }) {
  return (
    <div
      className="d-flex m-2 align-items-center"
    >
      
      <div className="ml-3">
        {similarSongList.map((data, key) => {
            return (
              
                <div key={key}>
                <img src={data.album.images[2].url} style={{ height: "64px", width: "64px" }} />
                    {data.name} - {data.artists[0].name}
                </div>
            )
        })}
       </div>
    </div>
  )
}
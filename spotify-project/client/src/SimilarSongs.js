import React from "react"

export default function SimilarSongs({ similarSongList }) {
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
    >
      
      <div className="ml-3">
        {similarSongList.map((data, key) => {
            return (
                <div key={key}>
                    {data.name}
                </div>
            )
        })}
       </div>
    </div>
  )
}
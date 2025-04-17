import React from 'react'


const Movie = ({ title, poster, type, year }) => {

  return (

    <div className="h-full flex flex-col justify-between bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-colors text-zinc-200 rounded-lg shadow-md p-3 transform hover:scale-105">

      {/* Poster */}
      <figure className="w-full aspect-[2/3] rounded-md overflow-hidden mb-3">
        <img
          src={poster}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Content */}
      <div className="flex flex-col justify-between flex-grow">
        {/* Title */}
        <div className="bg-zinc-700/60 rounded-md px-3 py-2 mb-2">
          <h3 className="text-lg font-semibold break-words">{title}</h3>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm px-1">
          <div className="flex items-center gap-2 text-zinc-200">
            <p className="text-base">Type: {type}</p>
          </div>
          <h6 className="text-zinc-400 text-sm">Year: {year}</h6>
        </div>
      </div>
    </div>


  )
}

export default Movie
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import useSWR from 'swr';

import Watchlist from '../Watchlist/Watchlist';
import {ToastContainer, toast } from 'react-toastify';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Watch = () => {

  const [MovieList, setMovieList] = useState([]);

  const id = sessionStorage.getItem("id");
  const { data, error, isLoading } = useSWR(
    id ? `${window.location.origin}/api/v2/getcompletedmovies/${id}` : null,
    fetcher
  );



  // Sync data into state when available
  useEffect(() => {
    if (data && data.movie) {
      setMovieList(data.movie);
    }
  }, [data]);

  // Handle error toast
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong!");
    }
  }, [error]);

  const toggle = (items) => {
  
    setMovieList(prev => prev.filter(m => m._id !== items._id));

  }


  return (
    <div className="section-body container mt-13 sm:mt-20 pt-1">
      <ToastContainer />
      <div className="flex justify-center items-center w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-center text-black p-6 bg-gray-100 rounded-2xl shadow-md mt-25">
            <span>Loading...</span>
          </div>
        ) : Array.isArray(MovieList) && MovieList.length > 0 ? (
          <Watchlist
            result={"Completed Movies"}
            list={MovieList}
            check="Delete"
            toggle={toggle}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-100 rounded-2xl shadow-md mt-25">
            <img
              src="/no-watchlist.png"
              alt="No movies illustration"
              className="w-64 max-w-full m-10"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Watch
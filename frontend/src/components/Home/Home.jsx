import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


import Watchlist from '../Watchlist/Watchlist';

const Home = () => {

  const [Inputs, setInputs] = useState(
    {
      movie: "",
      year: ""
    }
  );
  const [array, setArray] = useState([]);

  useEffect(() => {

    const savedMovies = sessionStorage.getItem("movieList");
    if(savedMovies){
      setArray(JSON.parse(savedMovies));
    }
    
  }, [])
  

  const change = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const getList = async () => {
    if(!Inputs.movie){
      toast.error("Movie name can not be empty!");
      return;
    }
    try {
      const api_key = import.meta.env.VITE_API_KEY;
      await axios.get(`https://www.omdbapi.com/?apikey=${api_key}&s=${Inputs.movie}&y=${Inputs.year}`)
      .then((response) => {
        
        if(response.data.Error){
          toast.error(response.data.Error);
          return;
        }
        setArray(response.data.Search);
        sessionStorage.setItem("movieList", JSON.stringify(response.data.Search));
        setInputs({
          movie: "",
          year: ""
        })
      })
    } catch (error) {
      toast.error("Somethig went wrong!");
    }

  }


  return (
    <div className='watchlist container mt-13 mb-10 sm:mt-20 pt-1 flex flex-col items-center text-white'>
      <ToastContainer />
      {/* Inputs  */}
      <div className="left-div mb-5 sm:mb-0 w-full sm:w-1/2 flex justify-center items-center">

        <div className="flex flex-col w-3/4 mx-auto">

          <label htmlFor="" className='label'>Movie</label>

          <input
            type="text"
            name="movie"
            id="movie"
            value={Inputs.movie}
            className='text-field '
            placeholder='Movie'
            onChange={change}
          />

          <label htmlFor="" className='label'>Year</label>
          <input
            type="text"
            name="year"
            id="year"
            value={Inputs.year}
            placeholder='Year'
            className='text-field '
            onChange={change}
          />

          <button
            type="submit"
            className='btn btn-primary btn-primary-submit w-full justify-center mt-3'
            onClick={getList}
          >
            Search
          </button>
        </div>

      </div>

      {/* Search Results */}

      <div className="flex justify-center items-center w-full">
      {Array.isArray(array) && array.length > 0 ? (
          <Watchlist
            result={"Search Results"}
            list={array}
            check="Add"
          />
        ) : (
          <div className="w-1/2 flex flex-col items-center justify-center text-center p-6 bg-gray-100 rounded-2xl shadow-md mt-5 ">
            <img
              src="/not-available.png"
              alt="No movies illustration"
              className="w-64 max-w-full m-10"
            />
          </div>
        )}
      </div>


    </div>
  )
}

export default Home
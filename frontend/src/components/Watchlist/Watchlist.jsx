import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import Movie from '../Movie';

let id = sessionStorage.getItem("id")

const Watchlist = ({ result, list, check, toggle }) => {

  const ManageMovies = async (props) => {

    id = sessionStorage.getItem("id");

    toggle?.(props);

    if (id && check === 'Add') { // Adding the movie to watchlist
      try {
        await axios.post(`${window.location.origin}/api/v2/add`, {
          Title: props.Title,
          Year: props.Year,
          Poster: props.Poster,
          Type: props.Type,
          id: id
        }).then((response) => {
          if(response.data.message==='Movie added successfully!'){
            toast(response.data.message);
          }else {
            toast.error(response.data.message);
          }         
        })
      } catch (error) {
        toast.error("Something went wrong!")
      }

    } else if (id && check === 'Complete') { // deleting from watchlist and adding to completed
      try {
        await axios.delete(`${window.location.origin}/api/v2/delete/${props._id}`, {
          data: {
            id
          }
        });
        await axios.post(`${window.location.origin}/api/v2/addcompleted`, {
          Title: props.Title,
          Year: props.Year,
          Poster: props.Poster,
          Type: props.Type,
          id: id
        });
        toast("Movie completed");
      } catch (error) {
        toast.error("Something went wrong!")
      }

    } else if (id && check === 'Delete') { // deleting from the completed
      try {
        await axios.delete(`${window.location.origin}/api/v2/deleteCompleted/${props._id}`, {
          data: {
            id
          }
        }).then((response) => {
          toast(response.data.message);
        })
      } catch (error) {
        toast.error("Something went wrong!")
      }

    } else {
      toast.error("Plese Sign in");
    }

  }

  return (
    <div className="pt-1 w-full">
      
      <h2 className="headline-2 lg:max-w-[12ch] mb-5">{result}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((items, index) => (
          <div key={index} className="flex flex-col h-full justify-between items-center">
            <Movie
              title={items.Title}
              poster={items.Poster}
              type={items.Type}
              year={items.Year}
            />
            <button
              className={`transform hover:scale-125 ${check === 'Add' ? 'btn-blue' : check === 'Complete' ? 'btn-secondary' : 'btn-error'}`}
              type="submit"
              onClick={() => ManageMovies(items)}
            >
              {check === 'Add' ? 'Add' : check === 'Complete' ? 'Complete' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;

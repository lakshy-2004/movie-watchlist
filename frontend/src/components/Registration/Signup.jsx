import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

import './Registration.css'

const Signup = () => {

  const dispatch = useDispatch();
  const history = useNavigate();

  const [Inputs, setInputs] = useState({
    username: "",
    password: ""
  })

  const change = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const submit = async (event) => {
    event.preventDefault();
    const check_username = Inputs.username;
    const check_password = Inputs.password;
    const user = check_username.includes(" ");
    const pass = check_password.includes(" ");

    
    if (Inputs.username.length < 3 || Inputs.password.length < 3) {
      toast.error("Username or Password should have atleast 3 characters!");
      return;
    }
    if(user || pass){
      return toast.error("Username or Password can not contain space in it!");
    }
    try {
      await axios.post(`${window.location.origin}/api/v1/register`,
        {
          username: Inputs.username,
          password: Inputs.password
        }
      )
        .then((response) => {
          if (response.data.message === 'User Saved') {
            dispatch(authActions.login());
            sessionStorage.setItem("id", response.data.others._id);
            history('/');
          } else {
            toast.error(response.data.message);
          }
        })

    } catch (error) {
      toast.error("Something went wrong!");
    }

  }

  return (
    <div className='signup flex justify-center items-center'>
      <ToastContainer />
      <div className="container flex justify-center items-center">
        <div className="w-200 h-100 bg-zinc-800 flex flex-col justify-center">

          <div className="left-div mb-5 sm:mb-0 flex flex-col justify-center items-center">
            <h2 className="headline-2 lg:max-w-[12ch] mb-5">
              SignUp
            </h2>
            <div className="flex flex-col w-3/4 mx-auto">

              <form action="">
                <label htmlFor="" className='label'>Username</label>

                <input
                  type="text"
                  name="username"
                  id="username"
                  value={Inputs.username}
                  className='text-field '
                  placeholder='Username'
                  onChange={change}
                />

                <label htmlFor="" className='label'>Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete='off'
                  value={Inputs.password}
                  placeholder='Password'
                  className='text-field '
                  onChange={change}
                />

                <button
                  type="submit"
                  className='btn btn-primary btn-primary-submit w-full justify-center mt-3'
                  onClick={submit}
                >
                  SignUp
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default Signup